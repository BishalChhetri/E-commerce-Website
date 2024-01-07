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
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      references: "product",
      referencesKey: "product_id",
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
      type: DataTypes.INTEGER,
      allowNULL: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNULL: false,
    },
  });

  OrderItems.belongsTo(sequelize.models.product, {
    foreignKey: "product_id",
    onDelete: "CASCADE",
  });

  return OrderItems;
};
