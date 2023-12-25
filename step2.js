const fs = require('fs');
const process = require('process');
const axios = require('axios');

const path = process.argv[2];

function cat(pathUrl){
    fs.readFile(pathUrl, 'utf-8', (err, data) => {
        if(err){
            console.log(err)
            process.exit(1)
        }
        console.log(data)
    })
}


async function webCat(url){
    try {
        let res = await axios.get(url);
        console.log(res.data)
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
    

    
    
}

function pathArg(arg){
    if(arg.startsWith('http')){
        webCat(arg)
    } else {
        cat(arg)
    }
}

pathArg(path)