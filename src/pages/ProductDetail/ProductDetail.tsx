import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../services/api";
import { useCart } from "../../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    const data = await getProductById(id!);
    setProduct(data);
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <img
        src={product.images?.[0]}
        width="300"
        alt={product.title}
      />

      <h1>{product.title}</h1>

      <p>{product.description}</p>

      <h2>₹ {product.price}</h2>

      <button
        onClick={() => addToCart(product)}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductDetail;