const db = require("../db")();

module.exports = () =>{
    
    
    const get =(id = null) =>{
        console.log('Inside Authors');
        if (!id || id> db.authors.length || id<=0){
            return db.authors;
        }
        return db.authors[parseInt(id) - 1];
    }

    const add =(name)=>{
        return db.authors.push({
            id: db.authors.length +1,
            name: name,    
        })
     
    }

    return {
        get,
        add,
    }
};