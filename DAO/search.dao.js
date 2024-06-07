const { PrismaClient } = require('@prisma/client');
const { HELPING_VERBS, MIN_CHARACTERS } = require('../constants/helpers');

const prisma = new PrismaClient();

const generateCombinations = (cities, brands, dishTypes, diets) => {
  const results = [];

  cities.forEach(city => {
    brands.forEach(brand => {
      const baseObj = {
        city: { id: city.id, name: city.name },
        brand: { id: brand.id, name: brand.name },
      };

      if (dishTypes.length > 0) {
        dishTypes.forEach(dishType => {
          if (diets.length > 0) {
            diets.forEach(diet => {
              results.push({
                ...baseObj,
                dishType: { id: dishType.id, name: dishType.name },
                diet: { id: diet.id, name: diet.name },
              });
            });
          } else {
            results.push({
              ...baseObj,
              dishType: { id: dishType.id, name: dishType.name },
            });
          }
        });
      } else if (diets.length > 0) {
        diets.forEach(diet => {
          results.push({
            ...baseObj,
            diet: { id: diet.id, name: diet.name },
          });
        });
      } else {
        results.push(baseObj);
      }
    });
  });

  return results;
};

async function extractEntities(searchTerm) {
  const terms = searchTerm.toLowerCase().split(/\s+/);

  const filteredTerms = terms.filter(term => !HELPING_VERBS.includes(term));

  const getWhereClause = (terms) => {
    return {
      OR: terms
        .filter(term => term.length >= MIN_CHARACTERS)
        .map(term => ({ name: { contains: term } }))
    };
  };

  const [cities, brands, dishTypes, diets] = await Promise.all([
    prisma.city.findMany({ where: getWhereClause(filteredTerms) }),
    prisma.brand.findMany({ where: getWhereClause(filteredTerms) }),    
    prisma.dishType.findMany({ where: getWhereClause(filteredTerms) }),
    prisma.diet.findMany({ where: getWhereClause(filteredTerms) })
  ]);

  return generateCombinations(cities, brands, dishTypes, diets);
}

module.exports = {
  extractEntities
};