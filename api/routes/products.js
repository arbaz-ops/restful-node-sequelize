const express = require("express");
const router = express.Router();
const { db } = require("../../database");
const { Product } = require("../models/products");

router.get("/", (req, res, next) => {
  db.sync({
    force: false
  })
    .then(result => {
      Product.findAll()
        .then(result => {
          res.status(200).json({
            message: "Products Fetched",
            productsDetails: result
          });
          result.map(doc => {
            console.log(doc.dataValues);
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  db.sync({
    force: false
  })
    .then(result => {
      Product.create({
        name: req.body.name,
        price: req.body.price
      })
        .then(result => {
          console.log("Product created");
          res.status(201).json({
            message: "Product Created",
            productDetails: result
          });
          console.log(result.dataValues);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: "Product not created..."
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:productID", (req, res, next) => {
  Product.findByPk(req.params.productID)
    .then(result => {
      res.status(200).json({
        message: "Product fetched...",
        productDetails: result
      });
      console.log(result.dataValues);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Product not Found..."
      });
    });
});

router.patch("/:productID", (req, res, next) => {
  Product.update(
    { name: req.body.name },
    {
      where: { productID: req.params.productID }
    }
  )
    .then(result => {
      res.status(200).json({
        message: "Product Updated",
        productsDetails: result
      });
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
