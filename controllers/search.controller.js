const searchService = require('../DAO/search.dao');

async function extractEntities(req, res) {
  const { searchTerm } = req.body;

  if (!searchTerm) {
    return res.status(400).send('searchTerm query parameter is required');
  }

  try {
    const entities = await searchService.extractEntities(searchTerm);
    res.json(entities);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  extractEntities
};