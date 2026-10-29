import { describe, it, expect, beforeEach } from 'vitest';
import { ShoppingCart, DiscountService } from '../src/cart';

class NoDiscounts implements DiscountService {
  rateFor(): number {
    return 0;
  }
}

describe('ShoppingCart', () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart(new NoDiscounts());
  });

  it('starts empty', () => {
    expect(cart.count()).toBe(0);
  });

  it('counts items', () => {
    cart.add({ name: 'pen', price: 2, qty: 1 });
    expect(cart.count()).toBe(1);
  });

  it('has a total of 0 when empty', () => {
    expect(cart.total()).toBe(0);
  });

  it('computes the total', () => {
    // Arrange
    cart.add({ name: 'pen', price: 2, qty: 3 });
    cart.add({ name: 'book', price: 10, qty: 1 });

    // Act
    const total = cart.total();

    // Assert
    expect(total).toBe(16);
  });

  it('accepts a quantity of 1', () => {
    expect(() => cart.add({ name: 'pen', price: 2, qty: 1 })).not.toThrow();
  });

  it('rejects a non-positive quantity', () => {
    expect(() => cart.add({ name: 'pen', price: 2, qty: 0 }))
      .toThrow('Quantity must be positive');
  });
});
