import nc from "next-connect";
import pool from "../../../utils/db";
import { onError } from "../../../utils/error";
import { isAuth } from "../../../utils/auth";
import db from "../../../models/db";
const Order = db.orders;

const handler = nc({ onError });
handler.use(isAuth);

handler.get(async (req, res) => {
  const result = await Order.findAll({ where: { user_id: req.user.user_id } });
  const order = Object.values(JSON.parse(JSON.stringify(result)));

  res.status(201).send(order);
});

export default handler;
