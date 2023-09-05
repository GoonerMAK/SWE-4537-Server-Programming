const os = require('os');
const fs = require('fs');


fs.writeFileSync("text.txt", "Hello ");

console.log("Before: ");
fs.readFile("text.txt", "utf-8", (err, data) => {
    if (err) {
    console.log(err);
    } else {
    console.log(data);
    }
});

fs.appendFile(
    "text.txt",
    "World",
    (err) => {
    if (err) {
    console.log(err);
    }
    else {
    console.log("New text is appended!!");
    }
});

console.log("After: ");
fs.readFile("text.txt", "utf-8", (err, data) => {
    if (err) {
    console.log(err);
    } else {
    console.log(data);
    }
});