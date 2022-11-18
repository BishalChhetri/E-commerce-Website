import nc from "next-connect";

const db = require("../../../models/db");
const Product = db.products;

const handler = nc();

handler.get(async (req, res) => {
  const result = await Product.findOne({ where: { slug: req.query.slug } });
  const product = Object.values(JSON.parse(JSON.stringify([result])));
  res.send(product);
});

export default handler;
