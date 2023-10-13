const connection = require("../../config/mysql");
const path = require("path");
const fs = require("fs");

const index = (req, res) => {
  const { search } = req.query;
  let execute = {};
  if (search) {
    execute = {
      sql: "SELECT * FROM product WHERE name LIKE ?",
      values: [`%${search}%`],
    };
  } else {
    execute = {
      sql: "SELECT * FROM product",
    };
  }
  connection.query(execute, _response(res));
};

const view = (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM product WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

const store = (req, res) => {
  const { name, price, stock } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    connection.query(
      {
        sql: "INSERT INTO product (name, price, stock, image_url) VALUES (?, ?, ?, ?)",
        values: [name, price, stock, `http://localhost:3000/gambar/${image.originalname}`],
      },
      _response(res)
    );
  }
};

const update = (req, res) => {
  const { name, price, stock } = req.body;
  const image = req.file;

  let sql = "";
  let values = [];

  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    sql = "UPDATE product SET name = ?, price = ?, stock = ?, image_url = ? WHERE id = ?";
    values = [name, price, stock, `http://localhost:3000/gambar/${image.originalname}`, req.params.id];
  } else {
    sql = "UPDATE product SET name = ?, price = ?, stock = ? WHERE id = ?";
    values = [name, price, stock, req.params.id];
  }
  connection.query({ sql, values }, _response(res));
};

const destroy = (req, res) => {
  connection.query(
    {
      sql: "DELETE FROM product WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

const _response = (res) => {
  return (error, result) => {
    if (error) {
      res.send({
        status: "Gagal menghapus data",
        response: error,
      });
    } else {
      res.send({
        status: "Berhasil menghapus data",
      });
    }
  };
};

module.exports = { index, view, store, update, destroy };
