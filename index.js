const express = require("express");
const cors = require("cors");

const app = express();

var corOptions = {
  origin: "https://localhost:8081",
};

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routers
// enable router through this
// const router = require("./routes/productRouter");
// app.use("/api/products", router);

// middleware

app.use(cors(corOptions));

// testing api

app.get("/", (req, res) => {
  res.json({ message: "hello from api" });
});

// port

const PORT = process.env.PORT || 8080;

//server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
