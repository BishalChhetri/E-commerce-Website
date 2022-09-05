// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { defaultListboxReducer } from "@mui/base";
// import pool from "../../utils/db";

export default async function handler(req, res) {
  // const allData = await pool.query("SELECT * FROM data ");
  res.status(200).json({ name: "Bishal" });
}
