// Generic API response wrapper
export interface ApiResponse<T> {
  message: string;
  data: T;
}

// Pagination response
export interface PaginatedResponse<T> {
  message: string;
  data: T[];
}

// Product types
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discount_percentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
  is_published: boolean;
  created_at: string;
  category_id: number;
  category: {
    id: number;
    name: string;
  };
}

export interface ProductCreateInput {
  title: string;
  description: string;
  price: number;
  discount_percentage?: number;
  rating?: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images?: string[];
  is_published?: boolean;
  category_id: number;
}

export interface ProductUpdateInput extends Partial<ProductCreateInput> {}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Category types
export interface Category {
  id: number;
  name: string;
}

export interface CategoryCreateInput {
  name: string;
}

export interface CategoryUpdateInput {
  name: string;
}

export interface CategoryQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Cart types
export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  subtotal: number;
  product: Product;
}

export interface Cart {
  id: number;
  user_id: number;
  created_at: string;
  total_amount: number;
  cart_items: CartItem[];
}

export interface CartItemInput {
  product_id: number;
  quantity: number;
}

export interface CartCreateInput {
  cart_items: CartItemInput[];
}

export interface CartUpdateInput {
  cart_items: CartItemInput[];
}

export interface CartQueryParams {
  page?: number;
  limit?: number;
}

// User types
export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  password?: string;
  role: string;
  is_active: boolean;
  created_at: string;
  carts?: Cart[];
}

export interface UserCreateInput {
  full_name: string;
  username: string;
  email: string;
  password: string;
}

export interface UserUpdateInput {
  full_name?: string;
  username?: string;
  email?: string;
  password?: string;
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

// Auth types
export interface SignUpInput {
  full_name: string;
  username: string;
  email: string;
  password: string;
}

export interface SignInInput {
  username: string;
  password: string;
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
}

// Account types
export interface AccountInfo {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
  carts: Cart[];
}

export interface AccountUpdateInput {
  username?: string;
  email?: string;
  full_name?: string;
}

// Error types
export interface ApiError {
  detail: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}
