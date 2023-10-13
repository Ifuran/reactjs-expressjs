const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "ifuran_crud",
  host: "localhost",
  username: "root",
  password: "",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Koneksi berhasil!.");
  } catch (error) {
    console.error("Tidak bisa terhubung ke database:", error);
  }
})();

module.exports = sequelize;
