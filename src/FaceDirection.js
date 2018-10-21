let CONST=require('./util/constant')

module.exports = class FaceDirection {
    constructor(direction) {
        this.EAST = {
            "LEFT": CONST.DIRECTION.N,
            "RIGHT": CONST.DIRECTION.S,
            "VALUE": CONST.DIRECTION.E,
            "posX": CONST.PROGRESS.FORWARD,
            "posY": CONST.PROGRESS.NONE
        };
        this.WEST = {
            "LEFT": CONST.DIRECTION.S,
            "RIGHT": CONST.DIRECTION.N,
            "VALUE": CONST.DIRECTION.W,
            "posX": CONST.PROGRESS.BACKWARD,
            "posY": CONST.PROGRESS.NONE
        };
        this.SOUTH = {
            "LEFT": CONST.DIRECTION.E,
            "RIGHT": CONST.DIRECTION.W,
            "VALUE": CONST.DIRECTION.S,
            "posY": CONST.PROGRESS.BACKWARD,
            "posX": CONST.PROGRESS.NONE
        }
        this.NORTH = {
            "LEFT": CONST.DIRECTION.W,
            "RIGHT": CONST.DIRECTION.E,
            "VALUE": CONST.DIRECTION.N,
            "posY": CONST.PROGRESS.FORWARD,
            "posX": CONST.PROGRESS.NONE
        }
        this.VALUE = direction.toUpperCase();
    }
}