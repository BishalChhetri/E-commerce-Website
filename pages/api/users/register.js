import nc from "next-connect";
import pool from "../../../utils/db";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  const query = `INSERT INTO user (name, email, password, isAdmin) VALUES ?`;

  const allData = [
    {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      isAdmin: false,
    },
  ];

  const queryArr = [
    allData.map((field) => [
      field.name,
      field.email,
      field.password,
      field.isAdmin,
    ]),
  ];
  const Error = (message) => {
    if (message.includes("Duplicate entry")) {
      res.status(401).send({ message: "Email is already used." });
    } else res.status(401).send({ message });
  };

  const userData = await new Promise((resolve, reject) => {
    pool.query(query, queryArr, function (err, result) {
      if (err) {
        return reject(Error(err.message));
      }
      const results = Object.values(JSON.parse(JSON.stringify(result)));

      resolve(results);
    });
  });

  const token = signToken(allData[0]);
  res.send({
    token,
    name: allData[0].name,
    email: allData[0].email,
    isAdmin: allData[0].isAdmin,
  });
});

export default handler;
