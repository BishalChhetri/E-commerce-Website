import nc from "next-connect";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";
import db from "../../../models/db";
const User = db.users;

const handler = nc();

handler.post(async (req, res) => {
  const allData = [
    {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      isAdmin: false,
    },
  ];
  const Error = (message) => {
    if (message.includes("Duplicate entry")) {
      res.status(401).send({ message: "Email is already used." });
    } else res.status(401).send({ message });
  };
  try {
    const result = await User.create(allData[0]);
    const user = Object.values(JSON.parse(JSON.stringify([result])));

    const token = signToken(user[0]);

    res.send({
      token,
      user_id: user[0].user_id,
      name: allData[0].name,
      email: allData[0].email,
      isAdmin: allData[0].isAdmin,
    });
  } catch (e) {
    Error(e.message);
  }
});

export default handler;
