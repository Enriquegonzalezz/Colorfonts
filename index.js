const express = require('express');
const { PORT } = require("./config");
const { createUsersRouter } = require("./Users/usersRoutes");
const { createColorsRouter } = require("./Colors/colorsRoutes");
require('dotenv/config');
const sequelize = require("./db/database");
//server
const app = express();


app.use(express.json());

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Error synchronizing the database:', err);
  });  

app.use("/", createUsersRouter());
app.use("/colors", createColorsRouter());


console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
})


app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

