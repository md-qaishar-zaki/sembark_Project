import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Header.css";

const Header: React.FC = () => {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">🛍️ SEMBARK</Link>
      </div>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/cart" className="cart-link" >
          🛒 Cart <span className="cart-count">
            {totalItems}
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;