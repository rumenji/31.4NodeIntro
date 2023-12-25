const fs = require('fs');
const process = require('process');
const axios = require('axios');

let path;
let pathTo;

if(process.argv.length === 3){
    path = process.argv[2];
} else if (process.argv.length === 5 && process.argv[2] == '--out') {
    pathTo = process.argv[3];
    path= process.argv[4];
} else {
    for(let arg of process.argv) {
        console.log(arg)
    }
}

function cat(path, filename){
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log(err)
            process.exit(1)
        }
        console.log(data)
        if(filename){
            writeTo(data, filename)
        }
    })
}


async function webCat(path, filename){
    try {
        let res = await axios.get(path);
        console.log(res.data)
        if (filename) {
            writeTo(res.data, filename)
        }
    } catch (error) {
        console.log(error)
        process.exit(1)

    }  
}

function pathArg(from, to){
    if(from){
        if(from.startsWith('http')){
            webCat(from, to)
        } else {
            cat(from,to)
        }
    }  
}

function writeTo(data, to){
    fs.writeFile(to, data, 'utf-8', function (err){
        if(err){
            console.log(err)
            process.exit(1)
        }
    })
}

pathArg(path, pathTo)