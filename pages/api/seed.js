import nc from "next-connect";
import pool from "../../utils/db";

const db = require("../../models/db");

// create main model
const Product = db.products;
const User = db.users;

import data from "../../utils/data";
const handler = nc();

handler.get(async (req, res) => {
  // For Sequelize Mysql
  await Product.destroy({
    where: {},
    truncate: true,
  });
  const allData = JSON.parse(JSON.stringify(data.products));
  allData.forEach(async (data) => {
    await Product.create(data);
  });
  res.send({ message: "Seeded Sucessfully" });
});

export default handler;
