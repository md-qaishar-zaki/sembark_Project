import { makeObservable, observable, action, computed } from 'mobx';
import { CartItem, Product } from '../types/index';

class CartStore {
  items: CartItem[] = [];

  constructor() {
    makeObservable(this, {
      items: observable,
      addItem: action,
      removeItem: action,
      totalPrice: computed,
      totalItems: computed,
    });
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }
  addItem = (product: Product) => {
    const existing = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(this.items));
  };
  removeItem = (productId: number) => {
    this.items = this.items.filter(
      (item) => item.product.id !== productId
    );
    localStorage.setItem('cart', JSON.stringify(this.items));
  };
  get totalPrice() {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  } 
  get totalItems() {
    return this.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }
}

export default new CartStore();