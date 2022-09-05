import nc from "next-connect";
import pool from "../../../utils/db";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  const query = `SELECT * FROM user WHERE email="${req.body.email}"`;
  const userData = await new Promise((resolve, reject) => {
    pool.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      const results = Object.values(JSON.parse(JSON.stringify(result)));
      resolve(results);
    });
  });
  const user = userData[0];

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

export default handler;
