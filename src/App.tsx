import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import CartContext from './context/CartContext';
import cartStore from './store/CartStore';
import Home from './pages/Home/Home';

function App() {
  return (
    <CartContext.Provider value={cartStore}>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;