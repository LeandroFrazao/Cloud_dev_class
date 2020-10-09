module.exports= () => {
    const authors =  require('../models/authors')();

    const getController = async(req,res)=>{
        //return res.end(JSON.stringify(authors.get()))
        res.json(await authors.get());
    };

    const getById = async(req, res)=>{
        res.json(await authors.get(parseInt(req.params.id)))
    }

    const postController = async( req, res) =>{
        const name = req.body.name;
        const result = await authors.add(name);
        res.json(result);
    };

    const populatedController = async(req, res)=>{
        res.json(await authors.aggregateWithBooks());
    };

    return {
        getController,
        postController,
        getById,
        populatedController,
     };


};