

export class CartItem{
  constructor(public product:any){ }
  quantity:number = 1;
  price: number = this.product.price * this.quantity;
}