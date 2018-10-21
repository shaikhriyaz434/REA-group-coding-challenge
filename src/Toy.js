let FaceDirection = require('./FaceDirection')

module.exports = class Toy {

    constructor() {
        this.faceDir = null;
        this.posX = 0;
        this.posY = 0;
        this.isPlaced = false;
    }

    placeTo(x, y, f, maxX, maxY, minX, minY) {
        if (x <= maxX && x >= minX && y <= maxY && y >= minY) {
            this.posX = x;
            this.posY = y;
            if (!this.faceDir) {
                this.faceDir = new FaceDirection(f.toUpperCase());
            } else {
                this.faceDir.VALUE = f.toUpperCase();
            }
            this.isPlaced = true;
        }
    }
    /**
     * 
     * @param {*} maxX 
     * @param {*} maxY 
     * @param {*} minX 
     * @param {*} minY 
     */
    moveTo(maxX, maxY, minX, minY) {
        var tempX = parseInt(this.posX) + parseInt(this.faceDir[this.faceDir.VALUE].posX);
        var tempY = parseInt(this.posY) + parseInt(this.faceDir[this.faceDir.VALUE].posY);
        if (tempX <= maxX && tempX >= minX && tempY <= maxY && tempY >= minY) {
            this.posX = tempX;
            this.posY = tempY;
        }

    }
    reportPosition() {
        return `${this.posX},${this.posY},${this.faceDir.VALUE}`
    }
    rotateSide(side) {
        let tempDir = this.faceDir[this.faceDir.VALUE][side.toUpperCase()];
        if (!tempDir)
            return 0
        else {
            this.VALUE = tempDir;
            return 1;
        }
    }
}