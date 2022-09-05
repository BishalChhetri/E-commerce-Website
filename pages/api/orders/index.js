import nc from "next-connect";
import pool from "../../../utils/db";
import { onError } from "../../../utils/error";
import { isAuth } from "../../../utils/auth";

const handler = nc({ onError });
handler.use(isAuth);

handler.post(async (req, res) => {
  const order_id = Math.floor(100000000 + Math.random() * 900000000);
  const order = { ...req.body, user: req.user.user_id };
  console.log(order);
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
  const orders = [{ ...order1, ...order2 }];

  const query =
    "INSERT INTO orders (order_id, user_id, payment_method, itemsPrice,shippingPrice,taxPrice, totalPrice,isPaid, fullName, address, email, mobile_no, city,postalCode,country) VALUES ?";

  const queryArr = [
    orders.map((field) => [
      field.order_id,
      field.user_id,
      field.payment_method,
      field.itemsPrice,
      field.shippingPrice,
      field.taxPrice,
      field.totalPrice,
      field.isPaid,
      field.fullName,
      field.address,
      field.email,
      parseInt(field.mobileno),
      field.city,
      field.postalCode,
      field.country,
    ]),
  ];

  const Error = (message) => {
    if (message.includes("Duplicate entry")) {
      res.status(401).send({ message: "Duplicate entry." });
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
        quantity: item[0].quantity,
        image: item[0].image,
        price: item[0].price,
      },
    ];
    const query =
      "INSERT INTO orderItems (orderItem_id, order_id, product_id, name,quantity,image, price) VALUES ?";

    const queryArr = [
      orderItem.map((field) => [
        field.orderItem_id,
        field.order_id,
        field.product_id,
        field.name,
        field.quantity,
        field.image,
        field.price,
      ]),
    ];
    const Error = (message) => {
      if (message.includes("Duplicate entry")) {
        res.status(401).send({ message: "Duplicate entry." });
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
  });

  res.status(201).send(order);
});

export default handler;
