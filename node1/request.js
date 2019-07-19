
const http = require('http');
const n = Number(process.argv[2]);
const type = process.argv[3];
const util = require('util');

var HttpRequest = (n, type) => {

    if (type == 'parallel') {
        parallelRequest(n);
        return;
    }

    if (type == 'sequential') {
        sequentialRequest(n);
        return;
    }

    console.log('unknown request type! Use parallel or sequential type'+ typeof(type)+" "+type + n);


};

var parallelRequest = (n) => {
 PromiseArray  =  new Array(n); 
    for (var i = 0; i<n; i++){
     PromiseArray[i] = new Promise((resolve,reject) =>{
      {  let  newRequest = http.request(options);
        newRequest.end(); 
        console.log("request sended "+i);
       };
     }); 
     
    
      }
  Promise.all(PromiseArray);    

};

var sequentialRequest = (n) => {

    for (var i = 0; i<n; i++){
      
      let  newRequest = http.request(options);
      newRequest.end();
      console.log("request sended");    
    }

};

const options = {
    port: 3000,
    host: '127.0.0.1',
    method: 'GET',
   
  };

  HttpRequest(n,type);