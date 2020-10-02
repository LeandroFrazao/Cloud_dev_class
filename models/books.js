const db = require("../db")();
const COLLECTION = "books";

module.exports = () => {

    const get = async() => {
        console.log('Inside Books model- Mongo');
        const books = await db.get(COLLECTION);
        return books;
        
    }

    const add = async (name, author) =>{
        const bookCount = await db.count(COLLECTION);
        const results = await db.add(COLLECTION,{
            id: bookCount + 1,
            name: name,
            author: author,
        });
        return results.result;
    }

    return {
        get,
        add,
    };

};