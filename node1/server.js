const http = require('http');
const port = 3000;
var i  = 0;
const server = http.createServer((req, res) => { 
    
    setTimeout(() =>{ i++;
         res.end("Answer"+ i);
         console.log('request' + i);
        },100);
 }).listen(3000);


console.log('Server started at port: ' + port);

