import nc from "next-connect";
import db from "../../../models/db";
const Product = db.products;

const handler = nc();

handler.post(async (req, res) => {
  const Error = (message) => {
    if (message.includes("Duplicate entry")) {
      res.status(401).send({ message: "Email is already used." });
    } else res.status(401).send({ message });
  };

  try {
    await Product.destroy({
      where: {
        product_id: req.body.product_id,
      },
    });
  } catch (error) {
    return Error(error.message);
  }

  res.send({
    message: "Successfully deleted!",
  });
});

export default handler;
