module.exports= () => {
    const authors =  require('../models/authors')();

    const getController =(req,res)=>{
        //return res.end(JSON.stringify(authors.get()))
        res.json(authors.get());
    };

    const getById = (req, res)=>{
        res.json(authors.get(req.params.id))
    }

    const postController =( req, res) =>{
        console.log(req.body);
        const name = req.body.name;
        console.log(name + ' Name')
        authors.add(name);
        return res.end(`POST: ${name}`)
    };

    return {
        getController,
        postController,
        getById,
    };
    

};