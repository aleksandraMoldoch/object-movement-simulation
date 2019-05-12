// Size of objects header.
const sizeOfHeader = 8;

// Function creates object based on data from stdin.
const objectCreate = (buff) => {
    let object = {
        // Size of tabel width x height.
        matrix: {
            width: buff.readInt16LE(0),
            height: buff.readInt16LE(2)
        },
        // Starting position.
        position: {
            positionX: buff.readInt16LE(4),
            positionY: buff.readInt16LE(6),
            direction: 'N'
        },
        // List of commands to perform.
        commands: []
    }

    // Fills command array, starts writing from 9th bytes (after header).    
    addCommands(object, buff, sizeOfHeader);

    // Checks if received data is correct and returns object.
    // If not, returns null.
    if (positionCheck(object)) {
        return null;
    } else {
        return object;
    }
}

// Function fills commands array.
const addCommands = (object, buff, offset) => {
    for (let i = offset; i < buff.length; i++) {
        object.commands.push(buff.readInt8(i));
    }
}

// Function return true if moving object is outside the tabel.
const positionCheck = (object) => {
    if (object.position.positionX < 0 || object.position.positionY < 0 || object.position.positionX >= object.matrix.width || object.position.positionY >= object.matrix.height) {
        return true;
    } else {
        return false;
    }
}

// Module exports.
module.exports = { sizeOfHeader, objectCreate, addCommands, positionCheck }