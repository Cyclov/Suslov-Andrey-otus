
const fs = require('fs');
const path = require('path');
const util = require('util');
const readdirProm = util.promisify(fs.readdir);
const opt = {
    withFileTypes: true
};
var tree  = {
    dirs:[],
    files:[]
    };
 
createTree = (mypath) =>{
   tree.dirs.push(mypath);
    return readdirProm(mypath,opt)
    .then(files =>{return readPath(mypath,files);})
    .then(tempTree => {
        let lowLeveResults = tempTree.dirs.map(createTree);
     
        tree.files= tree.files.concat(tempTree.files);
        return Promise.all(lowLeveResults)
          .then( lowLeveResults => {
              
              return tree;
          });
          
       });
    
 };

readPath = (pathDir,files) => {
    return new Promise((resolve) => {
    let tempobj = {
         dirs: [],
         files:[]
     };
        files.forEach(element => { 
    
        if (element.isDirectory() ) {
                let newPath = path.join(pathDir,element.name);
                tempobj.dirs.push(newPath);
         } else {tempobj.files.push(path.join(pathDir,element.name));}
        
      }); 
      resolve(tempobj); 
      }); 
};

createTree(process.argv[2]).then(result =>{console.log(JSON.stringify(result));});


















