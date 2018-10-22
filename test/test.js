let assert = require('chai').assert;
let CmdInterpreter = require('../src/CmdInterpreter');
let Toy = require('../src/Toy');
let inputs = require('./input/data');
let CONST = require('../src/util/constant');
let options = {
    "outFile": __dirname + "/data/output.txt"
}
let table = {
    maxX: 5,
    maxY: 5,
    minX: 0,
    minY: 0
}



describe("Testing Toy Robot", () => {
    it("placeTo should place toy in position x,y facing towards Direction passed in arguments", () => {
        let toy1 = new Toy();
        toy1.placeTo(5, 3, CONST.DIRECTION.N, table.maxX, table.maxY, table.minX, table.minY);
        let result=(toy1.posX==5&&toy1.posY==3&&toy1.faceDir.VALUE==CONST.DIRECTION.N)
        assert.isTrue(result);
    });
    it("toy should never move out of maxX, minX and maxY, minY",()=>{
        let toy1 = new Toy();
        toy1.placeTo(5, 5, CONST.DIRECTION.N, table.maxX, table.maxY, table.minX, table.minY);
        toy1.moveTo(table.maxX,table.maxY,table.minX,table.minY);
        let result=(toy1.posX>=table.minX&&toy1.posX<=table.maxX&&toy1.posY>=table.minY&&toy1.posY<=table.maxY);
        assert.isTrue(result);
    });
    it("after toy facing north rotated left, it should be faced towards west ",()=>{
        let toy1 = new Toy();
        toy1.placeTo(5, 5, CONST.DIRECTION.N, table.maxX, table.maxY, table.minX, table.minY);
        toy1.rotateSide(CONST.MOVE.L);
        assert.equal(toy1.faceDir.VALUE,CONST.DIRECTION.W);
    })
})



describe("Testing Command Interpreter", () => {
    let toyObj = new Toy();
    let cmdObj = new CmdInterpreter(toyObj, table.minX, table.maxX, table.minY, table.maxY, "\n", options)
    it("Toy's final position should always on the table if it is place at least once", () => {
        cmdObj.genrateRawCmds(inputs.CMDS_1);
        cmdObj.execute();
        let result = (toyObj.posX >= table.minX && toyObj.posX <= table.maxX && toyObj.posY >= table.minY && toyObj.posY <= table.maxY)
        assert.isTrue(result);

    });

    it("if toy is not placed on the table ignore the all the commands", () => {
        cmdObj.genrateRawCmds(inputs.CMDS_2);
        cmdObj.execute()
        let result = (toyObj.posX == null && toyObj.posY == null)
        assert.isTrue(result);

    })

    it("if toy is facing EAST after rotating right it should be facing towards south", () => {
        cmdObj.genrateRawCmds(inputs.CMDS_3);
        cmdObj.execute()
        let result = (toyObj.faceDir.VALUE == CONST.DIRECTION.S)
        assert.isTrue(result);
    })
})





