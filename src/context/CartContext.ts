import { createContext, useContext } from 'react';
import cartStore from '../store/CartStore';

const CartContext = createContext(cartStore);

export const useCart = () => useContext(CartContext);

export default CartContext;