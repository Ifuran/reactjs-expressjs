import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const { id } = useParams();
  const jumpu = useHistory();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v3/product/${id}`
        );
        setName(response.data.name);
        setPrice(response.data.price);
        setStock(response.data.stock);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", parseFloat(price));
    formData.append("stock", stock);
    formData.append("status", status);
    formData.append("image", productImage);

    try {
      await axios.put(`http://localhost:3000/api/v3/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      jumpu.push("/");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={updateProduct}>
          <Input
            name="name"
            type="text"
            label="Nama"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="price"
            type="number"
            label="Harga"
            value={price || ""}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            name="stock"
            type="number"
            label="Stock"
            value={stock || ""}
            onChange={(e) => setStock(e.target.value)}
          />
          <Input
            name="Image"
            onChange={(e) => setProductImage(e.target.files[0])}
            type="file"
            label="Image"
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            value={status || ""}
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
