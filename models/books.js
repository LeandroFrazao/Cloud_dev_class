const books = require("../controller/books");

const db = require("../db")();
const COLLECTION = "books";
const LOOKUP_AUTHORS_PIPELINE = [
  {
    $lookup: {
      from: "authors",
      localField: "author",
      foreignField: "id",
      as: "a",
    },
  },
  {
    $project: {
      id: 1,
      name: 1,
      author: {
        $arrayElemenAt: ["$a", 0],
      },
    },
  },
];
module.exports = () => {
  const get = async (id = null) => {
    console.log("Inside Books model- Mongo");
    if (!id) {
      try {
        const books = await db.get(COLLECTION);
        console.log({ bookList: books });
        return { bookList: books };
      } catch (ex) {
        console.log(" --------- Books get Error!");
        return { error: ex };
      }
    }
    try {
      const books = await db.get(COLLECTION, { id });
      return { bookList: books };
    } catch (error) {
      return { error: ex };
    }
  };

  const add = async (name, author) => {
    const bookCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: bookCount + 1,
      name: name,
      author: author,
    });
    return results.result;
  };

  const aggregateWithAuthors = async () => {
    const books = await db.aggregate(COLLECTION, LOOKUP_AUTHORS_PIPELINE);
    return books;
  };

  return {
    get,
    add,
    aggregateWithAuthors,
  };
};
