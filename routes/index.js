const express = require('express');
const asyncHandler = require('express-async-handler');
const SearchController = require('../controllers/search.controller');
const router = express.Router();

router.get('/search', asyncHandler(SearchController.extractEntities));

module.exports = router;
