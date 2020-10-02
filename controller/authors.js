module.exports= () => {
    const authors =  require('../models/authors')();

    const getController = async(req,res)=>{
        //return res.end(JSON.stringify(authors.get()))
        res.json(await authors.get());
    };

    const getById = (req, res)=>{
        res.json({error:"not implemented yet- authors.get(req.params.id)"})
    }

    const postController = async( req, res) =>{

        const name = req.body.name;
        const result = await authors.add(name);
        
        res.json(result);
    };

    return {
        getController,
        postController,
        getById,
    };
    

};