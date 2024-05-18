// src/app/models/order.model.ts

export interface Product {
    productId: string;
    quantity: number;
    price: number;
    productImage: string;
    productName: string;
  }
  
  export interface ShipTo {
    fullName: string;
    city: string;
    district: string;
    address: string;
    email: string;
    phone: string;
    note: string;
    ward: string;
  }
  
  export interface Order {
    _id: string;
    userId: string;
    products: Product[];
    shipTo: ShipTo;
    shippingFee: number;
    totalPrice: number;
    discountPrice: number;
    orderDate: string;
    paymentMethod: string;
    status: string;
    staffNote?: string;
  }
  