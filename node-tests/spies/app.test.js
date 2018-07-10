const expect = require("expect");
const rewire = require("rewire");

var app = rewire("./app");

describe("App", () => {
  let db = {
    saveUser: expect.createSpy()
  };

  app.__set__("db", db);

  it("should call save user with user objet", () => {
    const email = "thakursaurabh1998@gmail.com";
    const password = "123";

    app.handleSignUp(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({ email, password });
  });

  it("should call the spy correctly", () => {
    let spy = expect.createSpy();
    spy("Saurabh", 20);
    expect(spy).toHaveBeenCalledWith("Saurabh", 20);
  });
});
