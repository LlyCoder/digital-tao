/*
const crypto = require('crypto');
const hash = crypto.createHash('md5');
const password = '12';
hash.update(password);
console.log(hash.digest('hex'));
*/
const crypto = require('crypto');
const hash = crypto.createHash('md5');
let password = '12';
password = hash.update(password).digest('hex');
console.log(password);
