const router = require('express').Router();
const bookController = require('../../controllers/book-controller');

router.route('/').get(bookController.getBooks);

module.exports = router;
