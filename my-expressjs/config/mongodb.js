const { MongoClient } = require("mongodb");
const url = "mongodb://ifuran:123456@localhost:27017?authSource=admin";
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log("Berhasil terhubung ke MongoDB");
  } catch (e) {
    console.log(e);
  }
})();

const db = client.db("ifuran_crud");

module.exports = db;
