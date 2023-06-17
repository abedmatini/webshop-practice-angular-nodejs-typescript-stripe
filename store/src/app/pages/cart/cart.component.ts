import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: "./cart.component.html"
})
export class CartComponent {
  cart: Cart =  { items: [{
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1,
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'Bags',
    price: 180,
    quantity: 2,
    id:21,
  }]};

dataSource: Array<CartItem> = [];
displayedColumns: Array<string> = [
  'product',
  'name',
  'price',
  'quantity',
  'total',
  'action'
];
  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
    // return items.
    //   map((item)=> item.price * item.quantity)
    //   .reduce((prev,current) => prev + current, 0) ;
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async (res:any) =>{
      let stripe = await loadStripe('pk_test_51MpFnJAilmurncwnOrgwJfprbqeF0UkdXh38P3RBwiUFB30u5RdyH9wM1Lzpf8r2xVjlzDygSLapO8hmXT8C7uqZ004JqFc5t2');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    });

  }
}
