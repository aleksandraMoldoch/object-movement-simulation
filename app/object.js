// Function return true if moving object is outside the tabel.
const positionCheck = (object) => {
    if (object.position.positionX < 0 || object.position.positionY < 0 || object.position.positionX >= object.matrix.width || object.position.positionY >= object.matrix.height) {
        return true;
    } else {
        return false;
    }
}

// Module exports.
module.exports = { positionCheck }