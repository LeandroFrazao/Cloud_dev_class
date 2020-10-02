const express = require ('express');
const bodyParser = require('body-parser');


const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const booksController = require('./controller/books')();
const authorsController =  require('./controller/authors')();

const app = module.exports= express();


//app.use(bodyParser.json());
app.use('/', express.static('static')); //call the index.html in static folder

//login
app.use((req, res, next) =>{
    console.log('[%s] %s -- %s', new Date(), 'Method: ', req.method, req.url);

    res.setHeader ('Content-Type', 'application/json');
      next();    
});

app.use(bodyParser.json());
//get all books
app.get('/books', booksController.getController);
//add a book
app.post('/books', booksController.postController);
// a book
app.get('/books/:id', booksController.getById);

//get all authors
app.get('/authors', authorsController.getController);
//add an author
app.post('/authors', authorsController.postController);
// an author
app.get('/authors/:id', authorsController.getById);


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
