import nc from "next-connect";
import pool from "../../../utils/db";
import bcrypt from "bcryptjs";
import { isAuth, signToken } from "../../../utils/auth";

const handler = nc();
handler.use(isAuth);

handler.put(async (req, res) => {
  const allData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
      ? bcrypt.hashSync(req.body.password)
      : req.user.password,
    isAdmin: req.body.isAdmin
      ? bcrypt.hashSync(req.body.isAdmin)
      : req.user.isAdmin,
  };

  const Error = (message) => {
    if (message.includes("Duplicate entry")) {
      res.status(401).send({ message: "Email is already used." });
    } else res.status(401).send({ message });
  };

  await new Promise((resolve, reject) => {
    pool.query(
      "Update user SET name = ? , email = ?, password =?,isAdmin=? WHERE user_id=?",
      [
        allData.name,
        allData.email,
        allData.password,
        allData.isAdmin,
        req.user.user_id,
      ],
      function (err, result) {
        if (err) {
          return reject(Error(err.message));
        }
        const results = Object.values(JSON.parse(JSON.stringify(result)));
        resolve(results);
      }
    );
  });

  const token = signToken(allData);
  res.send({
    token,
    name: allData.name,
    email: allData.email,
    isAdmin: allData.isAdmin,
  });
});

export default handler;
