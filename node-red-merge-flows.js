/*
SPDX-license-identifier: Apache-2.0

Copyright (C) 2019 Sergio Tomasello

Authors:  Sergio Tomasello <sergio.tomasello@gmail.com>
Date: 2019.07.02
Description: Merge two or more node-red flows into one

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License
*/

const fs = require('fs');

var input_files = getFromArgs("--i");
var output_files = getFromArgs("--o");

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