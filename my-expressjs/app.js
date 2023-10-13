require("./config/mongoose");
const express = require("express");
const app = express();
// const productRouter = require("./app/product/routes");
// const foodRouter = require("./app/food/routes");
const productRouter2 = require("./app/product2/routes");
const productRouter3 = require("./app/product3/routes");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/gambar", express.static(path.join(__dirname, "uploads")));
app.use(cors());
// app.use("/api/v1", productRouter);
// app.use("/api/v2", foodRouter);
app.use("/api/v2", productRouter2);
app.use("/api/v3", productRouter3);
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: "Failed",
    message: `Resources ${req.originalUrl} not Found broo.`,
  });
});
app.listen(3000, () => console.log("Server: http://localhost:3000"));
