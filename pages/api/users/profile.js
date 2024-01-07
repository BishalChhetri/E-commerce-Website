import nc from "next-connect";
import bcrypt from "bcryptjs";
import { isAuth, signToken } from "../../../utils/auth";
import db from "../../../models/db";
const User = db.users;

const handler = nc();
handler.use(isAuth);

handler.put(async (req, res) => {
  const allData = {
    user_id: req.user.user_id,
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
  try {
    await User.update(allData, { where: { user_id: req.user.user_id } });
  } catch (e) {
    Error(e.message);
  }

  const token = signToken(allData);
  res.send({
    token,
    name: allData.name,
    email: allData.email,
    isAdmin: allData.isAdmin,
  });
});

export default handler;
