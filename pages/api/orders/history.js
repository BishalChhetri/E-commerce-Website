import nc from "next-connect";
import pool from "../../../utils/db";
import { onError } from "../../../utils/error";
import { isAuth } from "../../../utils/auth";

const handler = nc({ onError });
handler.use(isAuth);

handler.get(async (req, res) => {
  const query = `SELECT * FROM orders WHERE user_id="${req.user.user_id}"`;
  const order = await new Promise((resolve, reject) => {
    pool.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      const results = Object.values(JSON.parse(JSON.stringify(result)));
      resolve(results);
    });
  });
  console.log(order);
  res.status(201).send(order);
});

export default handler;
