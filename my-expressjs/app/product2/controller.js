const { ObjectId } = require("mongodb");
const db = require("../../config/mongodb");
const path = require("path");
const fs = require("fs");

const index = (req, res) => {
  db.collection("drinks")
    .find()
    .toArray()
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const view = (req, res) => {
  const { id } = req.params;
  db.collection("drinks")
    .findOne({ _id: new ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const store = (req, res) => {
  const { name, price, stock } = req.body;
  const image = req.file;

  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    db.collection("drinks")
      .insertOne({ name, price, stock, image_url: `http://localhost:3000/gambar/${image.originalname}` })
      .then((result) => res.send(result))
      .catch((error) => console.log(error));
  }
};

const update = (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  const image = req.file;
  const target = path.join(__dirname, "../../uploads", image.originalname);
  fs.renameSync(image.path, target);

  if (image) {
    db.collection("drinks")
      .updateOne({ _id: new ObjectId(id) }, { $set: { name, price, stock, image_url: `http://localhost:3000/gambar/${image.originalname}` } })
      .then((result) => res.send(result))
      .catch((error) => console.log(error));
  }
};

const destroy = (req, res) => {
  const { id } = req.params;
  db.collection("drinks")
    .deleteOne({ _id: new ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

module.exports = { index, view, store, update, destroy };
