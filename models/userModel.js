// MYSQL User TABLE SCHEMA IN DATABASE

//   CREATE TABLE user(
//    user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     name varchar(255) NOT NULL,
//     email varchar(255) Not NULL UNIQUE,
//     password varchar(255) NOT NULL,
//     isAdmin Boolean);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNULL: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    isAdmin: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    price: {
      type: DataTypes.BOOLEAN,
      allowNULL: false,
      default: false,
    },
  });

  return User;
};
