const { Book } = require('../models');

module.exports = {
  getBooks: async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
