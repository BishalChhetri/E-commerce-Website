import nc from "next-connect";
import { onError } from "../../../utils/error";
import { isAuth } from "../../../utils/auth";
import db from "../../../models/db";
const Order = db.orders;
const OrderItems = db.orderItems;

const handler = nc({ onError });
handler.use(isAuth);

handler.post(async (req, res) => {
  const order_id = Math.floor(100000000 + Math.random() * 900000000);
  const order = { ...req.body, user: req.user.user_id };

  order.order_id = order_id;
  const order1 = {
    order_id,
    user_id: order.user,
    payment_method: order.paymentMethod,
    itemsPrice: order.itemsPrice,
    shippingPrice: order.shippingPrice,
    taxPrice: order.taxPrice,
    totalPrice: order.totalPrice,
    isPaid: false,
  };
  const order2 = order.shippingAddress;
  order2.mobileno = parseInt(order2.mobileno);
  const orders = [{ ...order1, ...order2 }];
  const Error = (message) => {
    if (message.includes("Duplicate entry")) {
      res.status(401).send({ message: "Duplicate entry." });
    } else res.status(401).send({ message });
  };
  try {
    const userData = await Order.create(orders[0]);
  } catch (e) {
    Error(e.message);
    s;
  }
  order.orderItems.forEach(async (element) => {
    var orderItem_id = Math.floor(10000000 + Math.random() * 90000000);
    var quantity = element.quantity;

    var result = Object.keys(element).map((key) => [Number(key), element[key]]);
    var item = [{ ...result[0][1], quantity }];

    var orderItem = [
      {
        orderItem_id,
        order_id,
        product_id: item[0].product_id,
        name: item[0].name,
        slug: item[0].slug,
        quantity: item[0].quantity,
        image: item[0].image,
        price: item[0].price,
      },
    ];
    const Error = (message) => {
      if (message.includes("Duplicate entry")) {
        res.status(401).send({ message: "Duplicate entry." });
      } else {
        res.status(401).send({ message });
      }
    };

    try {
      const userData = await OrderItems.create(orderItem[0]);
    } catch (e) {
      Error(e.message);
    }
  });

  res.status(201).send(order);
});

export default handler;
