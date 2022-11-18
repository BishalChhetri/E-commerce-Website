import nc from "next-connect";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";
import db from "../../../models/db";
const User = db.users;
const handler = nc();

handler.post(async (req, res) => {
  const result = await User.findOne({ where: { email: req.body.email } });
  const userData = Object.values(JSON.parse(JSON.stringify([result])));
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
