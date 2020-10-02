module.exports= () => {
    const books =  require('../models/books')();

    const getController = async(req, res)=>{   
        res.json(await books.get());
    };

    const getById = (req, res)=>{
        res.json({ error: "byId not implemented yet books.get(req.params.id)"});
    };

    const postController= async(req, res)=>{
            const name = req.body.name;
            const author = req.body.author;
            const result = await books.add(name, author); 
            res.json(result); 
    };

    return {
        getController,
        postController,
        getById,
    }; 
};






