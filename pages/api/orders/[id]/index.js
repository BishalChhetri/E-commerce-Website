import nc from "next-connect";
import { isAuth } from "../../../../utils/auth";
import pool from "../../../../utils/db";
import db from "../../../../models/db";
const Order = db.orders;
const OrderItems = db.orderItems;

const handler = nc();

handler.get(async (req, res) => {
  handler.use(isAuth);

  // const query = `SELECT * FROM orders WHERE order_id="${req.query.id}"`;
  // const order = await new Promise((resolve, reject) => {
  //   pool.query(query, function (err, result, fields) {
  //     if (err) {
  //       return reject(err);
  //     }

  //     const results = Object.values(JSON.parse(JSON.stringify(result)));
  //     resolve(results);
  //   });
  // });

  const result = await Order.findOne({ where: { order_id: req.query.id } });
  const order = Object.values(JSON.parse(JSON.stringify([result])));
  const order_id = order[0].order_id;
  const results = await OrderItems.findOne({ where: { order_id: order_id } });
  const orderItems = Object.values(JSON.parse(JSON.stringify([results])));

  order[0].orderItems = orderItems;

  res.status(200).send(order[0]);
});

export default handler;
