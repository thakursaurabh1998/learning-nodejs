const fs = require('fs');
const os = require('os');

console.log('app.js');


fs.appendFileSync('text.txt',`hello ${os.userInfo().username}`);