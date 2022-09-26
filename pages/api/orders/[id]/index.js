import nc from "next-connect";
import { isAuth } from "../../../../utils/auth";
import pool from "../../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  handler.use(isAuth);

  const query = `SELECT * FROM orders WHERE order_id="${req.query.id}"`;
  const order = await new Promise((resolve, reject) => {
    pool.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }

      const results = Object.values(JSON.parse(JSON.stringify(result)));
      resolve(results);
    });
  });

  const order_id = order[0].order_id;

  const query2 = `SELECT * FROM orderItems WHERE order_id="${order_id}"`;
  const orderItems = await new Promise((resolve, reject) => {
    pool.query(query2, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      const results = Object.values(JSON.parse(JSON.stringify(result)));
      resolve(results);
    });
  });

  order[0].orderItems = orderItems;

  res.status(200).send(order[0]);
});

export default handler;
