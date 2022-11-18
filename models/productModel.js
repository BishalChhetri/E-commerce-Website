import { Description, VolunteerActivismSharp } from "@mui/icons-material";
import pool from "../utils/db";

// MYSQL TABLE SCHEMA in database

//   CREATE TABLE products(
//    product_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     name varchar(255) NOT NULL,
//     slug varchar(255) Not NULL UNIQUE,
//     category varchar(255) NOT NULL,
//     image varchar(255) Not NULL,
//     price int NOT NULL,
//     brand varchar(255) Not NULL,
//     rating int NOT NULL DEFAULT 0,
//     numReviews int Not NULL DEFAULT 0,
//     countInStock int NOT NULL DEFAULT 0,
//     description varchar(255) Not NULL,
//     date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
//     );

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    product_id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNULL: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNULL: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      default: 0,
    },
    numReviews: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      default: 0,
    },
    countInStock: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      default: 0,
    },
    description: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNULL: false,
      default: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  return Product;
};
