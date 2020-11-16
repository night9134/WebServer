'use strict';

var http = require('http');
var fs = require('fs');
var url = require('url');
const { strict } = require('assert');

var app = http.createServer(function(request,response){
    let _url = request.url;
    let queryData =url.parse(_url,true).query;
   
    let pathname = url.parse(_url,true).pathname;
    console.log(queryData.id, queryData.name);
    
    // if(_url == '/'){
    //   //_url = '/index.html';
    //   title = 'Welcome';
    // }
    // if(_url == '/favicon.ico'){
    //     response.writeHead(404);
    //     response.end();
    //     return;
    // }
    
    // 루트로 접속했는지 확인.
    console.log(url.parse(_url,true).pathname);
    if(pathname ==='/'){
      if(queryData.id === undefined) {
        
        console.log(__dirname + _url);
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err,desc){
          let title = 'Welcome';
          let description = 'Hello. NodeJs';
          let template = `
          <!doctype html>
          <html>
          <head>
            <title>Web1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        });
      } else {
        console.log(__dirname + _url);
      let title = queryData.id;
      fs.readFile(`data/${queryData.id}`, 'utf8', function(err,desc){
        let template = `
        <!doctype html>
        <html>
        <head>
          <title>Web1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ol>
          <h2>${title}</h2>
          <p>${desc}</p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template);
      });
      }
      
    } else {
      response.writeHead(404);
      response.end("Not Found");      
    }

    
    
    
    //response.end(queryData.id);

   //response.end(fs.readFileSync(__dirname + _url));
 
});
app.listen(3000);