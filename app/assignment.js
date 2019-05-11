// Module dependencies.
const { printResults, moveForward, moveBackwards, rotateClockwise, rotateCounterlockwise } = require('./commands');
const { positionCheck, } = require('./object');

// Global variables. 
let object = {
    // Size of tabel width x height.
    matrix: {
        width: 4,
        height: 4
    },
    // Starting position.
    position: {
        positionX: 2,
        positionY: 2,
        direction: 'N'
    },
    // List of commands to perform.
    commands: [1, 4, 1, 3, 2, 3, 2, 4, 1, 0]
};

// Function simulates movment of object on the table.
// Every step depends on the task from command array.
const movingObject = (data) => {
    // Length off array determines number of steps.
    const lengthOfCommands = data.commands.length;

    for (let i = 0; i < lengthOfCommands; i++) {
        switch (data.commands.shift()) {
            case 1:
                // Moves forward and checs if object is still on the tabel.
                moveForward(data.position);
                if (positionCheck(data)) {
                    let positionOutside = { positionX: -1, positionY: -1 };
                    printResults(positionOutside);
                };
                break;
            case 2:
                // Moves backward and checs if object is still on the tabel.
                moveBackwards(data.position);
                if (positionCheck(data)) {
                    let positionOutside = { positionX: -1, positionY: -1 };
                    printResults(positionOutside);
                };
                break;
            case 3:
                // Rotate object clockwise.
                rotateClockwise(data.position);
                break;
            case 4:
                // Rotate object counterclockwise.
                rotateCounterlockwise(data.position);
                break;
            case 0:
                // Ends program and returns final position to stdout.
                printResults(data.position);
            default:
                // If any undefined command was executed program ends.
                process.exit();
        };
    };
};

movingObject(object);
