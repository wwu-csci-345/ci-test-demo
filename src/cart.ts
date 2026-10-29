export interface Item {
  name: string;
  price: number;
  qty: number;
}

export interface DiscountService {
  rateFor(code: string): number; // 0.1 means 10% off
}

export class ShoppingCart {
  private items: Item[] = [];

  constructor(private discounts: DiscountService) {}

  totalWithCode(code: string): number {
    return this.total() * (1 - this.discounts.rateFor(code));
  }

  add(item: Item): void {
    if (item.qty <= 0) throw new Error('Quantity must be positive');
    this.items.push(item);
  }

  count(): number {
    return this.items.length;
  }

  total(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }
}
