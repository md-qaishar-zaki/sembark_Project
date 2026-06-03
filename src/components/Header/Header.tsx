import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">🛍️ MyShop</Link>
      </div>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/cart">🛒 Cart</Link>
      </nav>
    </header>
  );
};

export default Header;