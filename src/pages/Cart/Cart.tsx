import React from "react";
import { useCart } from "../../context/CartContext";
import './Cart.css'

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
    <div className="mainCart">
      <h1>Shopping Cart</h1>
      <div className="d-flex">
        <h3>Total Items: {totalItems}</h3>
        <div className="totalPrice">
          <h3>Total Price: ₹ {totalPrice}</h3>
          <button className="RemoveBTN Pay">Pay</button>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        cartItems.map((item) => (
          <div className="Products" key={item.id} >
            <img src={item.image} alt={item.title} width={120} height={120} />

            <div className="Flex">
              <h3>{item.title}</h3>
              <p>Price: ₹ {item.price}</p>
              <p>
                Subtotal: ₹{" "}
                {item.price * item.quantity}
              </p>

              <div className="BTNS">
                <button onClick={() => decreaseQuantity(item.id)} > - </button>
                <span >
                  <b>{item.quantity}</b>
                </span>
                <button onClick={() => addToCart(item)} > + </button>
              </div>
            </div>

            <button className="RemoveBTN" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;