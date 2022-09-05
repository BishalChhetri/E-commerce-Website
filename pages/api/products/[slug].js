import nc from "next-connect";
import pool from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  const query = `SELECT * FROM products WHERE slug="${req.query.slug}"`;
  const product = await new Promise((resolve, reject) => {
    pool.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      const results = Object.values(JSON.parse(JSON.stringify(result)));
      resolve(results);
    });
  });

  res.send(product);
});

export default handler;
