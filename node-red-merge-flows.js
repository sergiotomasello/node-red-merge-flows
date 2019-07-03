/*
SPDX-license-identifier: MIT

MIT License

Copyright (c) 2019 Sergio Tomasello

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


Authors:  Sergio Tomasello <sergio.tomasello@gmail.com>
Date: 2019.07.02
Description: Merge two or more node-red flows into one

*/


var fs = require('fs');
var argv = require('yargs') // eslint-disable-line
  /*.command('serve [port]', 'start the server', (yargs) => {
    yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000
      })
  }, (argv) => {
    if (argv.verbose) console.info(`start server on :${argv.port}`)
    serve(argv.port)
  })*/
  .option('version', {
    alias: 'v'
  })
  .option('input', {
    alias: 'i',
    describe: "Input json file",
    demandOption: true
  })
  .option('output', {
    alias: 'o',
    default: "merged.json",
    describe: "Output merged json file"

    
  })
  .check(function(options, arguments) {
        var msg = checkFilesExist(options.input);
        if(typeof msg !== "undefined"){
            throw new Error(msg);
        }
        msg = checkFilesFormat(options.input);
        if(typeof msg !== "undefined"){
            throw new Error(msg);
        }

      return true;
  })
  .argv


function checkFilesExist(files){
    var items = files;
    if( !Array.isArray(files) ){
        items = [];
        items.push(files)
    }
    
    var error_msg = ""; 
    for(var i = 0; i < items.length; i++){
        if( !fs.existsSync(items[i]) ) {
            error_msg+="File " + items[i] + " does not exists! \n";
        }
    }
    return (error_msg === '' ? undefined: error_msg);
}

function checkFilesFormat(files){
    var items = files;
    if( !Array.isArray(files) ){
        items = [];
        items.push(files)
    }
    var error_msg = ""; 
    for(var i = 0; i < items.length; i++){
        try{
            var data = fs.readFileSync(items[i]);
            JSON.parse(data);
        }
        catch(error){
            error_msg+="File " + items[i] + " is not in JSON format! \n";
        }
    }
    return (error_msg === '' ? undefined: error_msg);
}


// const argv = require('yargs').argv

// console.log(argv)


// const fs = require('fs');

// var input_files = getFromArgs("--i");
// var output_files = getFromArgs("--o");

var input_files = argv.input
var output_files = argv.output

if( !Array.isArray(argv.input) ){
    input_files = [];
    input_files.push(argv.input)
}

if( !Array.isArray(argv.output) ){
    output_files = [];
    output_files.push(argv.output)
}

var contents = getContent(input_files);
var merged = mergeContents(contents);

saveAll(output_files[0], merged);

function saveAll(file, data){
    data = JSON.stringify(data); 
    fs.writeFileSync(file, data);  
}

function mergeContents(contents){

    var final_array = [];
    
    for (var k = 0; k < contents.length; k++ ){
        for(var i = 0; i < contents[k].length; i++){
            final_array.push(contents[k][i]);
        }
    }
    return final_array;
}

function getContent(files){
    var contents = [];
    for(var i = 0; i< files.length; i++){
        var data = fs.readFileSync(files[i]);
        contents.push(JSON.parse(data));
    }

    return contents;
}

function getFromArgs(opt){
    var input_array = [];
    for(var i = 2; i< process.argv.length; i++){
        
        if(process.argv[i].startsWith(opt)){
            
            input_array.push(process.argv[i].split("=")[1]);
        }
    }

    return input_array;
}