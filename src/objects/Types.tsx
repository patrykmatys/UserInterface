export type Category = {
    id: string;
    name: string;
  };
  
export type Item = {
    id: string;
    name: string;
    category: Category[];
    price: number;
    created: number | null;
    updated: number | null;
  };

export type CartRequest = {
  user: string;
  itemId: string;
  quantity: number;
};

export type CartResponse = {
  user: string;
  items: Record<string, number>;
}

export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  cart: CartResponse;
  created: string;
  price: number;
};

export type OrderHistory = {
  user: string;
  orders: Order[];
};