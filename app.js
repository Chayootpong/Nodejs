const http = require('http');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const server = http.createServer( (req,res) => {

    console.log(req.url);
    var plist= req.url.split('/');
    console.log(plist);
    var jpath = path.join(__dirname);
    for(var i=0;i<plist.length;i++)
    {       
        if(plist[i] != '')
        {
            jpath=path.join(jpath,plist[i]);
        }
    }
    console.log(jpath);
    console.log(path.extname(jpath));
    var contype = path.extname(jpath).split('.')[1];
    console.log(contype);
    switch(contype)
    {
        case 'js':
        contype ='text/html';
        break;
        case 'png':
        contype ='image/png';
        break;
        case 'jpg':
        contype ='image/jpg';
        break;
        case 'svg':
        contype ='image/svg+xml';
        break;
        case 'html':
        contype ='text/html';
        break;
        case 'css':
        contype ='text/css';
        break;
        default:
        contype='';
        break;
  }

  if(req.url === '/') {
    fs.readFile(path.join(__dirname, 'home.html'), (err,content) => {
      if(err) throw err;
      res.writeHead(404, { 'Content-type': 'text/html'});
      res.end(content);
    });
  } else if(req.url === '/about') {
    fs.readFile(path.join(__dirname, 'profile.html'), (err,content) => {
      if(err) throw err;
      res.writeHead(404, { 'Content-type': 'text/html'});
      res.end(content);
    }); 
  } else if(contype != '') {
    fs.readFile(jpath, (err,content) => {
      if(err) throw err;
      res.writeHead(200, { 'Content-type': contype});
      res.end(content);
    }); 
  } else if(req.url === '/contact') {
    fs.readFile(path.join(__dirname, 'contact.html'), (err,content) => {
      if(err) throw err;
      res.writeHead(404, { 'Content-type': 'text/html'});
      res.end(content);
    }); 
  } else {
    res.writeHead(404, { 'Content-type': 'text/html'});
    res.end('<h1>Eror 404: Not Found</h1>');
  }
});

const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT);
});