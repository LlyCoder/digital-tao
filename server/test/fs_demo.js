'use strict'
const fs = require('fs')

let filePath = './demo.txt';
let fileContent = 'hello world!';
//2th param default utf-8
fs.writeFile(filePath, fileContent , (err) => {
    if(err) {
        throw err;
    } else {
        fs.readFile(filePath, 'utf-8', (err,data) => {
            if(err) {
                throw err;
            } else {
                console.log(data);
                fs.unlink(filePath, err => {
                    if(err) {
                        throw err;
                    } else {
                        console.log("have deleted!");
                    }
                });
            }
        })
    }
});
