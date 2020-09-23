const express = require ('express');
const bodyParser = require('body-parser');


const hostname = '127.0.0.1';
const port = 3000;

const booksController = require('./controller/books')();
const authorsController =  require('./controller/authors')();

const app = module.exports= express();

app.use('/', express.static('static')); //call the index.html in static folder


app.use(bodyParser.json());

app.use((req, res, next) =>{
    console.log('[%s] %s -- %s', new Date(), 'Method: ', req.method, req.url);
    console.log(req.body , "  Body in index");
    
    //res.statusCode = 200;
    res.setHeader ('Content-Type', 'application/json');
      next();
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    
});

app.use(bodyParser.json());
app.get('/books', booksController.getController);
app.post('/books', booksController.postController);
app.get('/authors', authorsController.getController);
app.post('/authors', authorsController.postController);


app.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
   
});

// 404

app.use((req, res)=>{
    res.status(404).json( //res.end('het'),
    {
        error: 404,
        message: 'Route not found',
    });
    
});

/*
const listener = (req,res) => {
    console.log('[%s] %s -- %s', new Date(), 'Method: '+ req.method, req.url);
    
    res.statusCode = 200;
    
    res.setHeader ('Content-Type', 'Application/json');
    
    switch (req.url) {
        case "/books":
            booksController.controller(req,res);
            break;
    
        case "/authors":
            authorsController.controller(req,res);
            break;
        
        case "/":
            res.end('Initial Page');
            break;
        default:
            res.statusCode = 404;
            res.end('404 resource not found');
            break; 
    }


    
    
    
    //res.end('\nEnd.');
};


const server = http.createServer(listener);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);;
});*/