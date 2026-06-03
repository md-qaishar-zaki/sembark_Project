import React from "react";
import { useCart } from "../../context/CartContext";

const Cart: React.FC = () => {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "20px auto",
        padding: "20px",
      }}
    >
      <h1>Shopping Cart</h1>

      <h3>Total Items: {totalItems}</h3>

      <h3>Total Price: ₹ {totalPrice}</h3>

      {cartItems.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              width={120}
              height={120}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <div style={{ flex: 1 }}>
              <h3>{item.title}</h3>

              <p>Price: ₹ {item.price}</p>

              <p>
                Subtotal: ₹{" "}
                {item.price * item.quantity}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  -
                </button>

                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    addToCart(item)
                  }
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() =>
                removeFromCart(item.id)
              }
              style={{
                background: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                cursor: "pointer",
                borderRadius: "6px",
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;