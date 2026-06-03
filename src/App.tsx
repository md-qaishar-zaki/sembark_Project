import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;