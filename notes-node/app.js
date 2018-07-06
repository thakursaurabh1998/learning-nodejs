const fs = require('fs');
const os = require('os');
const _ = require('lodash');

console.log('app.js');
console.log(_.isString("Saurabh thakur"));
console.log(_.isString([1,2,3]));

console.log(_.uniq([1,2,2,1,3,45,6,4,2]));


fs.appendFileSync('text.txt',`hello ${os.userInfo().username}`);