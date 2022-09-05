import nc from "next-connect";
import pool from "../../utils/db";
import data from "../../utils/data";

const handler = nc();

handler.get(async (req, res) => {
  // FOR product details INSERTION FROM FILE INTO DATABASE

  await pool.query("TRUNCATE TABLE data");
  const sql =
    "INSERT INTO data (name, slug, category, image, price, brand, rating, numReviews, countInStock, description) VALUES ?";

  const allData = JSON.parse(JSON.stringify(data.products));

  const queryArr = [
    allData.map((field) => [
      field.name,
      field.slug,
      field.category,
      field.image,
      field.price,
      field.brand,
      field.rating,
      field.numReviews,
      field.countInStock,
      field.description,
    ]),
  ];

  // FOR USER INSERTION FROM FILE INTO DATABASE

  // handler.get(async (req, res) => {
  //   await pool.query("TRUNCATE TABLE user");
  //   const sql = "INSERT INTO user (name, email, password, isAdmin) VALUES ?";

  //   const allData = JSON.parse(JSON.stringify(data.users));

  //   const queryArr = [
  //     allData.map((field) => [
  //       field.name,
  //       field.email,
  //       field.password,
  //       field.isAdmin,
  //     ]),
  //   ];

  await pool.query(sql, queryArr, function (err, result) {
    if (err) {
      return console.log(`Error in seeding data in mysql,${err.message}`);
    }
    console.log("Number of records inserted: " + result.affectedRows);
  });

  res.send({ message: "Seeded Sucessfully" });
});

export default handler;
