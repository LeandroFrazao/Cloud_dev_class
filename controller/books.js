module.exports = () => {
  const books = require("../models/books")();

  const getController = async (req, res) => {
    const { bookList, error } = await books.get();
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(bookList);
  };

  const getById = async (req, res) => {
    res.json(await books.get(parseInt(req.params.id)));
  };

  const populatedController = async (req, res) => {
    res.json(await books.aggregateWithAuthors());
  };

  const postController = async (req, res) => {
    const name = req.body.name;
    const author = req.body.author;
    const result = await books.add(name, author);
    res.json(result);
  };

  return {
    getController,
    postController,
    getById,
    populatedController,
  };
};
