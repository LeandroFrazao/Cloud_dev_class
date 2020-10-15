const express = require ('express');
const bodyParser = require('body-parser');

//testing2
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const booksController = require('./controller/books')();
const authorsController =  require('./controller/authors')();

const users = require("./models/users")();

const app = module.exports= express();


//app.use(bodyParser.json());
app.use('/', express.static('static')); //call the index.html in static folder

//login
app.use((req, res, next) =>{
    console.log('[%s] %s -- %s', new Date(), 'Method: ', req.method, req.url);

    res.setHeader ('Content-Type', 'application/json');
      next();    
});
//security
app.use((req, res, next)=>{
    const FailedAuthMessage = {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
        error: "Failed Authentication",
        message: "Go away!",
        code: "xxx", // some useful error code
    };

    const suppliedKey = req.headers["x-api-key"];
    const clientIp = 
    req.headers["x-fowarded-for"] || req.connection.remoteAddress;
    
    // check pre-shared key
    if (!suppliedKey){
        console.log(" [%s] FAILED AUTHENTICATION -- %s No Key Supplied",  
        new Date(), 
        clientIp
    );
    
    FailedAuthMessage.code = "01";
    return res.status(401).json(FailedAuthMessage);
    }
    if (!user){
        console.log(" [%s] FAILED AUTHENTICATION -- %s, BAD Key Supplied", 
        new Date(), 
        clientIp
        );
        FailedAuthMessage.code = "02";
        return res.status(401).json(FailedAuthMessage);
        }
        next();
    });
        

app.use(bodyParser.json());
//get all books
app.get('/books', booksController.getController);
//add a book
app.post('/books', booksController.postController);
// a book
app.get('/books/:id', booksController.getById);
// Get all books with authors
app.get("/books/populated", booksController.populatedController);

//get all authors
app.get('/authors', authorsController.getController);
//add an author
app.post('/authors', authorsController.postController);
// an author
app.get('/authors/:id', authorsController.getById);
// Get all authors with books
app.get("/authors/populated", authorsController.populatedController);

app.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
    //console.log(process.env.MONGO_URI)
});

// 404

app.use((req, res)=>{
    res.status(404).json({
        error: 404,
        message: 'Route not found',
    });
    
});
