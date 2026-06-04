import { useEffect, useState, useCallback, } from "react";
import { Link, useSearchParams, } from "react-router-dom";
import { getCategories, getProducts, } from "../../services/api";
import { useCart } from "../../context/CartContext";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const {
    cartItems,
    addToCart,
    decreaseQuantity,
  } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(
        "Error loading categories:",
        error
      );
    }
  };

  const loadProducts = useCallback(async () => {
    try {
      const data = await getProducts(
        selectedCategory ? Number(selectedCategory) : undefined, sort
      );
      setProducts(data);
    }
    catch (error) {
      console.error(
        "Error loading products:", error
      );
    }
  }, [selectedCategory, sort]);

  useEffect(() => { loadCategories(); }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const params = new URLSearchParams(
      searchParams
    );

    if (e.target.value) {
      params.set("category", e.target.value);
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  const handleSortChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const params = new URLSearchParams(
      searchParams
    );
    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    setSearchParams(params);
  };

  const getQuantity = (id: number) => {
    const item = cartItems.find(
      (item) => item.id === id
    );
    return item ? item.quantity : 0;
  };

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="filters">
        <select value={selectedCategory} onChange={handleCategoryChange} >
          <option value="">
            All Categories
          </option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} >
              {cat.name}
            </option>
          ))}
        </select>

        <select value={sort} onChange={handleSortChange} >
          <option value=""> Sort </option>
          <option value="lowToHigh"> Price Low To High </option>
          <option value="highToLow"> Price High To Low </option>
        </select>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="card" >
            <Link to={`/product/${product.id}/details`}>
              <img src={product.images?.[0]} alt={product.title} />
              <div className="titleBox">
                <h3>{product.title}</h3>
              </div>
            </Link>
            <div className="itemFooter">
              <div className="priceSection">
                <del>₹{product.price + 49}</del>
                <p>₹{product.price}</p>
              </div>
              {getQuantity(product.id) === 0 ? (
                <button className="add-btn" onClick={() =>
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image:
                      product.images?.[0] || "",
                    quantity: 1,
                  })
                }
                > Add To Cart
                </button>
              ) : (
                <div className="qty-box">
                  <button className="qty-btn" onClick={() =>
                    decreaseQuantity(
                      product.id
                    )
                  }
                  > - </button>

                  <span>
                    {getQuantity(product.id)}
                  </span>

                  <button className="qty-btn" onClick={() =>
                      addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image:
                          product.images?.[0] || "",
                        quantity: 1,
                      })
                    }
                  > + </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;