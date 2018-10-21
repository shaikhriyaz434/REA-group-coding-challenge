let fs = require('fs');
let CmdInterpreter = require('./src/CmdInterpreter');
let Toy = require('./src/Toy');

function readInputFile(loc) {
    return new Promise((resolve, reject) => {
        fs.readFile(loc, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result.toString())
            }
        })
    })

}


function startExecution() {
    readInputFile(__dirname + '/data/input.txt').then(result => {
        let toyObj = new Toy();
        let options = {
            "outFile": __dirname + "/data/output.txt"
        }
        let cmdObj = new CmdInterpreter(toyObj, 0, 5, 0, 5, "\n", options);
        cmdObj.genrateRawCmds(result);
        cmdObj.execute();
    }).catch(err => {
        console.log("error while reading", err);
    })
}
startExecution()