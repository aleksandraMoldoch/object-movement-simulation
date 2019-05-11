// Command '0': function quit simulation and print results
const printResults = (position) => {
    let bufferOut = Buffer.allocUnsafe(4);

    bufferOut.writeInt16LE(position.positionX, 0);
    bufferOut.writeInt16LE(position.positionY, 2);
    process.stdout.write(bufferOut);
    process.exit();
}

// Command '1': function changes position of element(forward) depending on direction.
const moveForward = (position) => {
    switch (position.direction) {
        case 'N':
            position.positionY -= 1;
            break;
        case 'S':
            position.positionY += 1;
            break;
        case 'E':
            position.positionX += 1;
            break;
        case 'W':
            position.positionX -= 1;
            break;
    }
}

 // Command '2': function changes position of element(backwards) depending on direction.
const moveBackwards = (position) => {
    switch (position.direction) {
        case 'N':
            position.positionY += 1;
            break;
        case 'S':
            position.positionY -= 1;
            break;
        case 'E':
            position.positionX -= 1;
            break;
        case 'W':
            position.positionX += 1;
            break;
    }
}

 // Command '3': function changes direction of element(90 degrees clockwise).
const rotateClockwise = (position) => {
    switch (position.direction) {
        case 'N':
            position.direction = 'E';
            break;
        case 'S':
            position.direction = 'W';
            break;
        case 'E':
            position.direction = 'S';
            break;
        case 'W':
            position.direction = 'N';
            break;
    };
}

 // Command '4': function changes direction of element(90 degrees counterclockwise).
const rotateCounterlockwise = (position) => {
    switch (position.direction) {
        case 'N':
            position.direction = 'W';
            break;
        case 'S':
            position.direction = 'E';
            break;
        case 'E':
            position.direction = 'N';
            break;
        case 'W':
            position.direction = 'S';
            break;
    };
}

// Module exports.
module.exports = { printResults, moveForward, moveBackwards, rotateClockwise, rotateCounterlockwise };
