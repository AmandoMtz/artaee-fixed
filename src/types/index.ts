// src/types/index.ts

export interface Product {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  category: string;
  image: string;
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  avatar_url?: string;
  created_at?: string;
}

export interface AuthSession {
  token: string;
  user: User;
}

export interface OrderItem {
  product_name: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  notes?: string;
  created_at: string;
  items: OrderItem[];
}
