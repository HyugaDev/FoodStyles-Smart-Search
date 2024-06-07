# SmartSearch Assessment - Node with Prisma

This is a application that allows users to input a searchTerm and returns the list of combination of cities with brands, dishTypes and diets.

## Functionality

With the SmartSearch Assessment, you can perform the following actions:

1. Given a searchTerm, it will respond with the list of respective objects. like:
```
For searchTerm=McDonald’s in London or Manchester multiple cities can be identified, so the 
function will return:
  [{
    city: {id: 1, name: 'London'},
    brand: {id: 4, name: "McDonald's"}
  },
  {
    city: {id: 6, name: 'Manchester'},
    brand: {id: 4, name: "McDonald's"}
  }]
```

## How to Start

#### ( **Important** : Node version is v20.14.0)

To get started with the SmartSearch app, please follow the instructions below:

1. Clone the repository from the github by following command

```
git clone https://github.com/HyugaDev/FoodStyles-Smart-Search
```

2. Navigate to the project directory using your command prompt or terminal.
3. Run the command `yarn install` to install all necessary dependencies.

4. Run the command to copy the .env.example file to .env

```ssh
cp .env.example .env
```
5. Change the SERVER_PORT and DATABASE_URL variables like following:
```ssh
  SERVER_PORT= "3002"
  DATABASE_URL="postgresql://<username>:<password>@localhost:5432/smart_search"
```
6. Seed the database by following command:
```
  npm run seed
```
7. Run the command npm start to start the server.

```ssh
npm start
```


## Tech stack

The tech stack used to build the SmartSearch is:

1. Node JS - to create server-side web applications
2. Prisma - helps developers read and write data to the database in an intuitive, efficient and safe way
3. Postgresql -  also known as Postgres, is a free and open-source relational database management system emphasizing extensibility