// Module import
const fs = require("fs");

// Sample data
let width = 4; // width of object
let hight = 4; // hight of object
let positionX = 2; // position x of object
let positionY = 2; // position y of object
// list of commands:
// 0 - quit simulation and print results, 
// 1 - move forward,
// 2 - move backward,
// 3 - rotate clockwise,
// 4 - rotate counterclockwise,
let commands = [1, 4, 1, 3, 2, 3, 2, 4, 1, 0]; 

// Counting size of memory to allocate.
let size = 4 * 2 + commands.length;
const buf = Buffer.allocUnsafe(size);

// Writing header to buffer.
buf.writeInt16LE(width, 0);
buf.writeInt16LE(hight, 2);
buf.writeInt16LE(positionX, 4);
buf.writeInt16LE(positionY, 6);

// Writing commands to buffer.
for (let i = 0; i < commands.length; i++) {
    buf.writeInt8(commands[i], 8 + i);
}

// Writing sample data to file.
fs.writeFile("data.txt", buf, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});
