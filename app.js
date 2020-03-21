const express = require("express");
const app = express();
const { db } = require("./database");
const bodyparser = require("body-parser");
const productRoutes = require("./api/routes/products");
const port = process.env.PORT || 3000;

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: false }));

db.authenticate()
  .then(result => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log("DB connection failed...");
    console.log(err);
  });

app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Listening to localhost:${port}`);
});
