import nc from "next-connect";
import pool from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  const products = await pool.query("SELECT * FROM data");
  res.send(products);
});

export default handler;
