const { mongoose } = require("mongoose");
mongoose.connect("mongodb://ifuran:123456@localhost:27017/ifuran_crud?authSource=admin");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log("Server database terhubung!"));
