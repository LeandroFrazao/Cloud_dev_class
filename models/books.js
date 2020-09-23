const db = require("../db")();

module.exports = () => {

    
    const get = () => {
        console.log('Inside Books');
        return db.books;
    }

    const add = (name, author) =>{
       // console.log(name);
        return db.books.push({
            id: db.books.length + 1,
            name: name,
            author: author
            
        })
       
    }

    return {
        get,
        add,
    };

};