const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

const prisma = new PrismaClient();

async function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}
async function main() {
  const cities = await readCSV(path.join(__dirname, 'data/cities-v2 - cities.csv'));
  const brands = await readCSV(path.join(__dirname, 'data/brands-v2 - brands.csv'));
  const dishTypes = await readCSV(path.join(__dirname, 'data/dish-types-v2 - dish-types.csv'));
  const diets = await readCSV(path.join(__dirname, 'data/diets-v2 - diets.csv'));

  const uniqueCities = [...new Map(cities.map(item => [item.name, item])).values()];
  const uniqueBrands = [...new Map(brands.map(item => [item.name, item])).values()];
  const uniqueDishTypes = [...new Map(dishTypes.map(item => [item.name, item])).values()];
  const uniqueDiets = [...new Map(diets.map(item => [item.name, item])).values()];

  await prisma.city.createMany({ data: uniqueCities.map(c => ({ id: parseInt(c.id), name: c.name.toLowerCase() })) });
  await prisma.brand.createMany({ data: uniqueBrands.map(b => ({ id: parseInt(b.id), name: b.name.toLowerCase() })) });
  await prisma.dishType.createMany({ data: uniqueDishTypes.map(d => ({ id: parseInt(d.id), name: d.name.toLowerCase() })) });
  await prisma.diet.createMany({ data: uniqueDiets.map(d => ({ id: parseInt(d.id), name: d.name.toLowerCase() })) });
}
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });