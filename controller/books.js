module.exports= () => {
    const books =  require('../models/books')();

    const getController = (req, res)=>{
        //return res.end(JSON.stringify(books.get()));
        res.json(books.get());
    };
    const getById = (req, res)=>{
        res.json(books.get(req.params.id));
    };

    const postController= (req, res)=>{
        
            console.log(req.body, " body in books/controller");
            const name = req.body.name;
            const author = req.body.author;
            books.add(name, author);
            return res.end(`POST: ${name}`);
    };

    return {
        getController,
        postController,
        getById,
    };
    
};






