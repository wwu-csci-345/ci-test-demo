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
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }
}
