const { db } = require("../../database");
const Sequelize = require("sequelize");

module.exports.Product = db.define(
  "products",
  {
    productID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      unique: false,
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.BIGINT,
      allowNull: false
    }
  },
  {
    timestamps: false,
    hooks: {
      beforeValidate: function() {
        console.log("Before Validation");
      },
      beforeCreate: function() {
        console.log("Before Creating");
      },
      afterCreate: function(product) {
        console.log("After Creating");
      },
      afterValidate: async function() {
        console.log("After Validation");
      },
      beforeFind: function() {
        console.log("Before Finding Product");
      },
      afterFind: function() {
        console.log("After Finding Product");
      }
    }
  }
);
