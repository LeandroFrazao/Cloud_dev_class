
const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;
//const uri = require('../MONGO_key')().MONGO_URI;  //avoid doing this-SECURITY REASONS
const DB_NAME = "CWBA";
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true};

module.exports = () => {   
    
    const aggregate = (collectionName, pipeline =[])=>{
        return new Promise((resolve, reject)=>{
            MongoClient.connect(uri,MONGO_OPTIONS,(err, client)=>{
                const db = client.db(DB_name);
                const collection = db.collection(collectionName);

                collection.aggregate(pipeline).toArray((err, docs)=>{
                    if (err){
                        console.log("--- Aggregate ERROR ---");
                        console.log(err);
                    }
                    resolve(docs);
                    client.close();
                })
            })
        })
    }
    
    const count = (collectionName)=>{
        return new Promise((resolve, reject)=>{
            MongoClient.connect(uri, MONGO_OPTIONS,(err, client) =>{ 
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                
                collection.countDocuments({}, (err, docs)=>{
                    resolve(docs);
                    client.close();
                })
            })
        })
    }
    
    const get = (collectionName, query = {})=>{
        return new Promise((resolve, reject)=>{
            MongoClient.connect(uri, MONGO_OPTIONS,(err, client) =>{
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.find(query).toArray((err, docs)=>{                    
                    resolve(docs);
                    client.close();
                })
            })
        });
    };    
    
    const add= (collectionName, item)=>{
        return new Promise((resolve, reject)=>{
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client)=>{
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                
                collection.insertOne(item, (err, result) =>{
                    resolve(result);
                    client.close();
                    
                }) 
            }) 
        });
    };
        
    const authors =[
        {id:1, name: 'Willian Gibson'},
        {id:2, name: 'Neil Stephenson'}
    ];
    const books = [
        {id:1 , name: 'Snow Crash', "author": 2},
        {id:2 , name: 'Cryptonomicon',"author": 2},
        {id:3 , name: 'Neuromancer',"author": 1}
    ];
    
    return {
        books,
        authors,
        get,
        add,
        count,
        aggregate,
    };
};