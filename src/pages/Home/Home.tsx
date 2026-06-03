import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, getProducts } from "../../services/api";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, sort]);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const loadProducts = async () => {
    const data = await getProducts(
      selectedCategory ? Number(selectedCategory) : undefined,
      sort
    );

    setProducts(data);
  };

  return (
    <div className="container">
      <h1>Products</h1>

      <div className="filters">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="lowToHigh">
            Price Low To High
          </option>
          <option value="highToLow">
            Price High To Low
          </option>
        </select>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="card"
          >
            <img
              src={product.images?.[0]}
              alt={product.title}
            />

            <h3>{product.title}</h3>

            <p>₹ {product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;