
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  prepTime: string;
  isSpicy?: boolean;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface Booking {
  name: string;
  contact: string;
  date: string;
  time: string;
  guests: number;
  location: 'indoor' | 'outdoor';
  notes: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
