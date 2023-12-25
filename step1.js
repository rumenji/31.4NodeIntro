const fs = require('fs');
const process = require('process');

const path = process.argv[2]

function cat(pathUrl){
    fs.readFile(pathUrl, 'utf-8', (err, data) => {
        if(err){
            console.log(err)
            process.exit(1)
        }
        console.log(data)
    })
}

cat(path)