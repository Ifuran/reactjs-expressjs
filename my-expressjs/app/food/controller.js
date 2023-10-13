const path = require("path");
const food = require("./model");
const fs = require("fs");
const { Op } = require("sequelize");

const index = async (req, res) => {
  const search = req.query.search;
  let result = "";

  try {
    if (search) {
      result = await food.findAll({ where: { name: { [Op.like]: `%${search}%` } } });
    } else {
      result = await food.findAll();
    }
    res.send({
      status: "Berhasil menampilkan data",
      response: result,
    });
  } catch (error) {
    res.send({
      status: "Gagal menampilkan data",
      response: error,
    });
  }
};

const view = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await food.findAll({
      where: {
        id: id,
      },
    });
    res.send({
      status: "Berhasil ambil data",
      response: result,
    });
  } catch (error) {
    res.send({
      status: "Gagal ambil data",
      response: error,
    });
  }
};

const store = async (req, res) => {
  const { name, price, stock } = req.body;
  const image = req.file;

  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await food.sync();
      const result = await food.create({ name, price, stock, image_url: `http://localhost:3000/gambar/${image.originalname}` });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { name, price, stock } = req.body;
  const image = req.file;
  const target = path.join(__dirname, "../../uploads", image.originalname);
  fs.renameSync(image.path, target);

  if (!image) {
    return res.status(400).json({ error: "Gambar tidak ada." });
  }

  try {
    const result = await food.update(
      { name, price, stock, image_url: `http://localhost:3000/gambar/${image.originalname}` },
      {
        where: { id: id },
      }
    );
    res.send({
      status: "Berhasil updata data",
      response: result,
    });
  } catch (error) {
    res.send({
      status: "Gagal update data",
      response: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await food.destroy({
      where: {
        id: id,
      },
    });
    res.send({
      status: "Berhasil menghapus data",
      response: result,
    });
  } catch (error) {
    res.send({
      status: "Gagal menghapus data",
      response: error,
    });
  }
};

module.exports = { index, view, store, update, destroy };
