const db = require("../db")();
const COLLECTION = "authors";
const LOOKUP_BOOKS_PIPELINE = [
    {
        $lookup:{
            from: "books",
            localField: "id",
            foreignField: "author",
            as: "books", 
        },
    },
];

module.exports = () =>{
   
    const get = async(id = null) =>{
        console.log('Inside Authors Model');
        if  (!id){
            const authors = await db.get(COLLECTION);
            return authors;
        }
        return {error: "byId not implemented yet"}
    }
    
    const add = async (name)=>{
        const authorCount = await db.count(COLLECTION);
        const results = await db.add(COLLECTION, {
            id: authorCount + 1,
            name: name
        });
        return results.result;    
    }
   
    const aggregateWithBooks = async () =>{
        const authors = await db.aggregate(COLLECTION,LOOKUP_BOOKS_PIPELINE)
        return authors;
    };

    return {
        get,
        add,
        aggregateWithBooks,
    }
};