import { describe, it, expect, vi } from 'vitest';
import { ShoppingCart, DiscountService } from '../src/cart';

class FakeDiscounts implements DiscountService {
  rateFor(code: string): number {
    return code === 'SAVE10' ? 0.1 : 0;
  }
}

describe('ShoppingCart discount codes', () => {
  it('applies a valid discount code', () => {
    const cart = new ShoppingCart(new FakeDiscounts());
    cart.add({ name: 'book', price: 10, qty: 2 });

    expect(cart.totalWithCode('SAVE10')).toBeCloseTo(cart.total() * 0.9);
  });

  it('ignores an unknown code', () => {
    const cart = new ShoppingCart(new FakeDiscounts());
    cart.add({ name: 'book', price: 10, qty: 2 });

    expect(cart.totalWithCode('BOGUS')).toBe(cart.total());
  });

  it('asks the service about the code', () => {
    const discounts = { rateFor: vi.fn().mockReturnValue(0.5) };
    const cart = new ShoppingCart(discounts);
    cart.add({ name: 'book', price: 10, qty: 2 });

    expect(cart.totalWithCode('HALF')).toBeCloseTo(cart.total() * 0.5);
    expect(discounts.rateFor).toHaveBeenCalledWith('HALF');
  });
});
