import { Link } from "react-router-dom";
import axios from "axios";
import "./index.scss";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    await axios
      .get("http://localhost:3000/api/v3/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v3/product/${id}`);
      getProducts();
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-right">Stock</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td className="text-right">{item.price}</td>
              <td className="text-right">{item.stock}</td>
              <td className="text-center">
                <Link
                  to={`/detail/${item._id}`}
                  className="btn btn-sm btn-info"
                >
                  Detail
                </Link>
                <Link
                  to={`/edit/${item._id}`}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </Link>
                <Link
                  to="/"
                  onClick={() => deleteProduct(item._id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
