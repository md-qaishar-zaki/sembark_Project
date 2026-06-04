import React from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/api";
import { useCart } from "../../context/CartContext";
import './ProductDetail.css'

const ProductDetail: React.FC = () => {
  const { id } = useParams();

  const products = getProducts();

  const {
    cartItems,
    addToCart,
    decreaseQuantity,
  } = useCart();

  const [product, setProduct] = React.useState<any>(null);

  React.useEffect(() => {
    const loadProduct = async () => {
      const data = await products;

      const selectedProduct = data.find(
        (item: any) =>
          item.id === Number(id)
      );
      setProduct(selectedProduct);
    };
    loadProduct();
  }, [id]);

  const getQuantity = (
    productId: number
  ) => {
    const item = cartItems.find(
      (item) => item.id === productId
    );

    return item
      ? item.quantity
      : 0;
  };

  if (!product) {
    return (
      <div className="main">
        <div className="card-loader">
          <div className="skeleton loader-image"></div>
          <div className="loader-content">
            <div className="skeleton loader-title"></div>
            <div className="skeleton loader-price"></div>
            <div className="skeleton loader-text"></div>
            <div className="skeleton loader-text"></div>
            <div className="skeleton loader-text"></div>
            <div className="skeleton loader-text short"></div>
            <div className="skeleton loader-button"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="gridBox">
        <img src={product.images?.[0]} alt={product.title} />
        <div style={{ flex: 1, }}>
          <h1>{product.title}</h1>
          <h2>
            <del>₹{product.price + 49}</del>
            ₹{product.price}
          </h2>
          <p style={{ lineHeight: "1.8", marginTop: "20px", }}>
            {product.description}
          </p>

          <div className="mt">
            {getQuantity(product.id) ===
              0 ? (
              <button className="add-btn" onClick={() => addToCart({
                id: product.id, title: product.title, price: product.price, image: product.images?.[0] || "", quantity: 1,
              })
              }
              > Add To My Cart </button>
            ) : (
              <div className="qty-box" >
                <button className="qty-btn" onClick={() =>
                  decreaseQuantity(
                    product.id
                  )
                }
                > - </button>
                <span>
                  {getQuantity(
                    product.id
                  )}
                </span>

                <button className="qty-btn" onClick={() => addToCart({
                  id: product.id, title: product.title, price: product.price, image: product.images?.[0] || "", quantity: 1,
                })} > +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;