import { useState } from "react";
import Input from "../../components/Input";
import "./index.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const Tambah = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const history = useHistory();

  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", parseFloat(price));
    formData.append("stock", stock);
    formData.append("status", status);

    if (productImage) {
      formData.append("image", productImage);
    }

    try {
      await axios
        .post("http://localhost:3000/api/v3/product/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Berhasil menambahkan produk", response.data);
          setName("");
          setPrice("");
          setStock("");
          setStatus();
          setProductImage(null);
          history.push("/");
        });
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={addProduct}>
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
          />
          <Input
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
          />
          <Input
            name="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
          />
          <Input
            name="Image"
            onChange={handleImageChange}
            type="file"
            placeholder="Image Produk..."
            label="Image"
          />
          <Input
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            type="checkbox"
            label="Active"
            defaultChecked
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
