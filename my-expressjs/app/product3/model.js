const { mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name harus diisi!"],
    minlength: 3,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: [true, "Price harus diisi!"],
  },
  stock: {
    type: Number,
    required: [true, "Stock harus diisi!"],
  },
  image_url: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
