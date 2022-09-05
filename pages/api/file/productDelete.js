import nc from "next-connect";
import pool from "../../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
  const query = `DELETE FROM  products WHERE product_id="${req.body.product_id}"`;

  const Error = (message) => {
    if (message.includes("Duplicate entry")) {
      res.status(401).send({ message: "Email is already used." });
    } else res.status(401).send({ message });
  };

  await new Promise((resolve, reject) => {
    pool.query(query, function (err, result) {
      if (err) {
        return reject(Error(err.message));
      }
      resolve(result);
    });
  });

  res.send({
    message: "Successfully deleted!",
  });
});

export default handler;
