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
//     mobileno BIGINT NOT NULL,
//       city varchar(255) NOT NULL,
//      postalCode varchar(255) NOT NULL,
//     country varchar(255) NOT NULL,
//         date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//        FOREIGN KEY (user_id) REFERENCES user(user_id)
//        );

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "orders",
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNULL: false,
        references: "user",
        referencesKey: "user_id",
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      itemsPrice: {
        type: DataTypes.INTEGER,
        allowNULL: false,
      },
      shippingPrice: {
        type: DataTypes.INTEGER,
        allowNULL: false,
      },
      taxPrice: {
        type: DataTypes.INTEGER,
        allowNULL: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
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
      mobileno: {
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
    },
    { timestamps: false }
  );

  return Order;
};
