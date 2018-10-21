let fs = require('fs');
let CONST = require('./util/constant')
module.exports = class CmdInterpreter {
    constructor(toyObj, min_x, max_x, min_y, max_y, cmd_seperator, options) {
        this.toy = toyObj;
        this.directions = [CONST.DIRECTION.E, CONST.DIRECTION.W, CONST.DIRECTION.S, CONST.DIRECTION.N];

        this.commands = [
            CONST.COMMANDS.PLACE, CONST.COMMANDS.REPORT,
            CONST.COMMANDS.MOVE, CONST.COMMANDS.LEFT,
            CONST.COMMANDS.RIGHT];
        this.minX = min_x;
        this.minY = min_y;
        this.maxX = max_x;
        this.maxY = max_y;
        this.cmdSep = cmd_seperator;
        this.options = options;
        this.pipeline = [];
    }

    validateCommand(cmd) {
        if (this.commands.indexOf(cmd.toUpperCase()) >= 0) {
            return true;
        } else {
            return false;
        }
    }

    genrateRawCmds(input) {
        this.pipeline = input.split(this.cmdSep);
        return 1;
    }
    execute() {
        this.pipeline.forEach(cmd => {
            let symbols = cmd.split(" ")
            let operator = symbols[0].toUpperCase();
            if (this.validateCommand(operator)) {
                switch (operator) {
                    case CONST.COMMANDS.MOVE:
                        if (this.toy.isPlaced)
                            this.toy.moveTo(this.maxX, this.maxY, this.minX, this.minY);
                        break;
                    case CONST.COMMANDS.PLACE:
                        let temp = symbols[1].split(',');
                        this.toy.placeTo(temp[0], temp[1], temp[2], this.maxX, this.maxY, this.minX, this.minY);
                        break;
                    case CONST.COMMANDS.RIGHT:
                    case CONST.COMMANDS.LEFT:
                        if (this.toy.isPlaced)
                            this.toy.rotateSide(operator);
                        break;
                    case CONST.COMMANDS.REPORT:
                        if (this.toy.isPlaced) {
                            let result2 = this.toy.reportPosition()
                            fs.writeFile(this.options.outFile, result2, err => {
                                console.log("please check output file")
                            });
                        }
                }
            } else {
                console.log("invalid command", cmd);
            }

        });
    }
}
