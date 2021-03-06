const { mongoose } = require("../db/mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  return _.pick(userObject, ["_id", "email"]);
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = "auth";
  const token = jwt.sign(
    { _id: user._id.toHexString(), access },
    "supersecretsalt"
  );

  user.tokens.push({ access, token });

  return user.save().then(() => token);
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, "supersecretsalt");
  } catch (error) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;

  User.findOne({ email }).then(user => {
    if (!user) return Promise.reject();

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, result) => {
        if (result) resolve(user);
        reject();
      });
    });
  });
};

UserSchema.pre("save", function(next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return;
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const Todo = mongoose.model("todo", {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  Todo,
  User
};
