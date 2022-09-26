// This is the orders table in database

// CREATE TABLE orders(
//         order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
//         user_id INT NOT NULL,
//         payment_method varchar(255) Not NULL,
//         itemsPrice INT NOT NULL,
//         shippingPrice INT Not NULL,
//         taxPrice int NOT NULL ,
//         totalPrice int Not NULL,
//       isPaid Boolean ,
//       fullName varchar(255) NOT NULL,
//       address varchar(255) NOT NULL,
//      email varchar(255) NOT NULL,
//     mobile_no BIGINT NOT NULL,
//       city varchar(255) NOT NULL,
//      postalCode varchar(255) NOT NULL,
//     country varchar(255) NOT NULL,
//         date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//        FOREIGN KEY (user_id) REFERENCES user(user_id)
//        );

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("orders", {
    order_id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      autoIncrement: true,
      PrimaryKey: true,
    },
    user_id: {
      type: DataTypes.INT,
      allowNULL: false,
      references: user,
      referencesKey: user_id,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    itemsPrice: {
      type: DataTypes.INT,
      allowNULL: false,
    },
    shippingPrice: {
      type: DataTypes.INT,
      allowNULL: false,
    },
    taxPrice: {
      type: DataTypes.INT,
      allowNULL: false,
    },
    totalPrice: {
      type: DataTypes.INT,
      allowNULL: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    mobile_no: {
      type: DataTypes.BIGINT,
      allowNULL: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNULL: false,
      default: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  return Order;
};

// This is the orderItems table in database

// CREATE TABLE orderItems(
//     orderItem_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     order_id INT NOT NULL,
//     product_id INT NOT null,
//     name varchar(255) NOT NULL,
//     slug varchar(255) Not NULL,
//     quantity INT NOT NULL,
//     image varchar(255) NOT NULL,
//     price INT NOT NULL,
//     FOREIGN KEY (product_id) REFERENCES products(product_id)
// );

module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define("orderItems", {
    orderItem_id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      autoIncrement: true,
      PrimaryKey: true,
    },
    order_id: {
      type: DataTypes.INT,
      allowNULL: false,
      references: ProductionQuantityLimits,
      referencesKey: product_id,
    },
    product_id: {
      type: DataTypes.INT,
      allowNULL: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    quantity: {
      type: DataTypes.INT,
      allowNULL: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    price: {
      type: DataTypes.INT,
      allowNULL: false,
    },
  });

  return OrderItems;
};

//Ignore these tables now

// CREATE TABLE shippingAddress(
//     orderItem_id int NOT NULL,
// fullName varchar(255),
// address varchar(255),
// city varchar(255),
// postalCode varchar(255),
// country varchar(255),
//     FOREIGN KEY (orderItem_id) REFERENCES orderItems(orderItem_id)
// );

// CREATE TABLE orderItems (
//   user_id int Not Null,
//     Order_id int NOT NULL,
//     OrderNumber int NOT NULL,
//     PersonID int,
//     PRIMARY KEY (OrderID),
//     FOREIGN KEY (user_id) REFERENCES user(user_id)
// );

// {
//     orderItems: [ { '0': [Object], quantity: 1 } ],
//     shippingAddress: {
//       fullName: 'Bishal KC',
//       address: 'Nayagoun',
//       city: 'Pokhara',
//       postalCode: '1024',
//       country: 'Nepal'
//     },
//     paymentMethod: 'E-sewa',
//     itemsPrice: 70,
//     shippingPrice: 100,
//     taxPrice: 10.5,
//     totalPrice: 180.5,
//     user: {
//       id: 1,
//       name: 'Bishal KC',
//       email: 'kcbisal1@gmail.com',
//       isAdmin: 1,
//       iat: 1662274358,
//       exp: 1664866358
//     }
//   }

// import { Description, VolunteerActivismSharp } from "@mui/icons-material";
// import payment from "../pages/payment";
// import pool from "../utils/db";

// import { INTERNALS } from "next/dist/server/web/spec-extension/request";

// MYSQL TABLE SCHEMA
//   CREATE TABLE order(
//     user varchar(255) NOT NULL,
//     orderItems varchar(255) Not NULL UNIQUE,
//     shippingAddress varchar(255) NOT NULL,
//     paymentMethod varchar(255) Not NULL,
//     itemsPrice int NOT NULL,
//     shippingPrice varchar(255) Not NULL,
//     taxPrice int NOT NULL DEFAULT 0,
//     totalPrice int Not NULL DEFAULT 0,
//     isPaid Boolean DEFAULT false,
//     isDeliverd Boolean DEFAULT false:
//     paidAt TIMESTAMP NOT NULL,
//     deliverdAt TIMESTAMP NOT NULL,
//     date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY (slug));
