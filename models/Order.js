// import { Description, VolunteerActivismSharp } from "@mui/icons-material";
// import payment from "../pages/payment";
// import pool from "../utils/db";

import { INTERNALS } from "next/dist/server/web/spec-extension/request";

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

// CREATE TABLE orderItems(
//     user_id INT,
//     name varchar(255),
//     quantity INT,
//     image varchar(255),
//     price INT
// );

// CREATE TABLE shippingAddress(
//     fullName varchar(255),
//     address varchar(255),
//     city varchar(255),
//     postalCode varchar(255),
//     country varchar(255)
// );
// CREATE TABLE shippingAddress (
//     OrderID int NOT NULL,
//     OrderNumber int NOT NULL,
//     PersonID int,
//     PRIMARY KEY (OrderID),
//     FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
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
