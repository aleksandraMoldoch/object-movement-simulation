// Module dependencies.
const { printResults, moveForward, moveBackwards, rotateClockwise, rotateCounterlockwise } = require('./commands');
const { objectCreate, positionCheck, addCommands, sizeOfHeader } = require('./object');

// Global variables. 
let buffer = Buffer.allocUnsafe(0);
let object = null;

// Getting data from stdin. 
process.stdin.on('data', (chunk) => {
    // Checks if object existe.
    if (object) {
        // Fills commands array of object when receive new chunk of data.  
        addCommands(object, chunk, 0);
        // Moves object according to commands.
        movingObject(object);
    } else {
        // Concats buffer of two parts of data.
        buffer = Buffer.concat([buffer, chunk]);

        // Checks if buffer is long enough to create at least object matrix and position.
        // If it is true, object is created.
        if (buffer.length >= sizeOfHeader) {
            object = objectCreate(buffer);
            // If object was created sucessfully, function movingObject is called.
            if (object) {
                movingObject(object);
            } else {
                // If creation of object failed, program stops and returns [-1,-1] to stdout.  
                let positionOutside = { positionX: -1, positionY: -1 };
                printResults(positionOutside);
            };
        };
    };
});

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
