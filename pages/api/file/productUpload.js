import nc from "next-connect";
import pool from "../../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
  const query =
    "INSERT INTO products (name, slug, category, image, price, brand, rating, numReviews, countInStock, description) VALUES ?";
  const allData = [
    {
      name: req.body.name,
      slug: req.body.slug,
      category: req.body.category,
      image: req.body.image,
      price: parseInt(req.body.price),
      brand: req.body.brand,
      rating: parseInt(req.body.rating),
      numReviews: parseInt(req.body.numReviews),
      countInStock: parseInt(req.body.countInStock),
      description: req.body.description,
    },
  ];

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

  const Error = (message) => {
    if (message.includes("Duplicate entry")) {
      res.status(401).send({ message: "Email is already used." });
    } else res.status(401).send({ message });
  };

  const userData = await new Promise((resolve, reject) => {
    pool.query(query, queryArr, function (err, result) {
      if (err) {
        return reject(Error(err.message));
      }
      const results = Object.values(JSON.parse(JSON.stringify(result)));

      resolve(results);
    });
  });

  res.send({
    data: allData[0],
  });
});

export default handler;
