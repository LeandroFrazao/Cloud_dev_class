module.exports = () => {
  const authors = require("../models/authors")();

  const getController = async (req, res) => {
    //return res.end(JSON.stringify(authors.get()))
    res.json(await authors.get());
  };

  const populatedController = async (req, res) => {
    res.json(await authors.aggregateWithBooks());
  };

  const getById = async (req, res) => {
    res.json(await authors.get(parseInt(req.params.id)));
  };

  const postController = async (req, res) => {
    const name = req.body.name;
    const result = await authors.add(name);
    res.json(result);
  };

  return {
    getController,
    postController,
    getById,
    populatedController,
  };
};

/*
Books model
const getController = async (req, res) => {
    const {booksList, error} = await books.get()
    if (error) {
      return res.status(500).json( {error})
    }
    res.json({ books: booksList });
  };
Books controlle




const get = (collectionName, query = {}) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        if (err) {
          console.log(err)
          return reject("=== get::MongoClient.connect")
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);

        collection.find(query).toArray((err, docs) => {
          if (err) {
            console.log("  === get::collection.find")
            console.log(err)
            return reject(err)
          }

          resolve(docs);
          client.close();
        });
      });
    });
  };



That was in db
module.exports = () => {
  const get = async (id = null) => {
    console.log("   inside books model");
    if (!id) {
      try {
        const books = await db.get(COLLECTION);
        console.log(books)
        return { booksList: books };
      } catch (ex) {
        console.log(" ------------- BOOKS GET ERROR")
        return { error: ex }
      }
    }

    try{
      const book = await db.get(COLLECTION, { id });
      return { booksList: books };
    } catch (ex) {
      return { error: ex }
    }
  };





*/
