const path = require("path");
const fs = require("fs");
const Product = require("./model");
const { ObjectId } = require("mongodb");

const index = (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const view = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const store = (req, res) => {
  const { name, price, stock } = req.body;
  const image = req.file;

  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    Product.create({
      name,
      price,
      stock,
      image_url: `http://localhost:3000/gambar/${image.originalname}`,
    })
      .then((result) => res.send(result))
      .catch((error) => console.log(error));
  }
};

const update = (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  const image = req.file;

  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    Product.updateOne({ _id: id }, { $set: { name, price, stock, image_url: `http://localhost:3000/gambar/${image.originalname}` } })
      .then((result) => res.send(result))
      .catch((error) => console.log(error));
  }
};

const destroy = (req, res) => {
  const { id } = req.params;
  Product.deleteOne({ _id: id })
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

module.exports = { index, view, store, update, destroy };
