// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json({ extendedUrl: true }));


// app.listen(process.env.SERVER_PORT || 3002, () => {
//   console.log('App listening on port ', process.env.SERVER_PORT || 3002);
// });

const express = require('express');
const searchRoute = require('./routes')
const app = express();
require('dotenv').config();

app.use(express.json());
app.use('/api/v1', searchRoute);

app.listen(process.env.SERVER_PORT || 3002, () => {
  console.log('App listening on port ', process.env.SERVER_PORT || 3002);
});
