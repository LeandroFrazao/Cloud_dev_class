const db = require("../db")();

module.exports = () => {

    const get = ( id = null) => {
        console.log('Inside Books');
        if (!id || id>db.books.length || id<=0){
            return db.books;    
        }
        return db.books[parseInt(id) - 1];
        
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