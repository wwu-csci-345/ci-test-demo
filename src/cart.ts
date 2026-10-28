export const TAX_RATE = 0.1;

export interface Item {
  name: string;
  price: number;
  qty: number;
}

export class ShoppingCart {
  private items: Item[] = [];

  add(item: Item): void {
    if (item.qty <= 0) throw new Error('Quantity must be positive');
    this.items.push(item);
  }

  count(): number {
    return this.items.length;
  }

  total(): number {
    const sum = this.items.reduce((s, i) => s + i.price * i.qty, 0);
    return sum * (1 + TAX_RATE);
  }
}
