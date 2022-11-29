import nc from "next-connect";
import db from "../../../models/db";
const Product = db.products;

const handler = nc();

handler.post(async (req, res) => {
  const allData = {
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
  };

  try {
    const product = await Product.create(allData);
  } catch (e) {
    Error(e.message);
  }
  res.send({
    data: allData,
  });
});

export default handler;
