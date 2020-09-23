const db = require("../db")();

module.exports = () =>{
    
    
    const get =() =>{
        console.log('Inside Authors');
        return db.authors;
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