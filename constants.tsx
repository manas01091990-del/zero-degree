
import { MenuItem, Review } from './types';

export const COLORS = {
  PRIMARY: '#00C853', // Fresh Green for Veg
  ACCENT1: '#FFD700', // Gold for Luxury
  ACCENT2: '#B9FBC0', // Light green badge
  NEUTRAL: '#F8F9FA',
  BACKGROUND: '#121212', // Charcoal Grey
};

export const CONTACT_NUMBER = '9810619424';

export const MENU_ITEMS: MenuItem[] = [
  // WRAPS
  {
    id: 'w1',
    name: 'Chilli Paneer Wrap',
    description: 'A spicy wrap filled with chilli paneer, fresh veggies, and our special zesty sauce.',
    price: 109,
    category: 'Wraps',
    image: 'https://images.unsplash.com/photo-1662116765994-4e44735632b6?q=80&w=800&auto=format&fit=crop',
    prepTime: '12 mins',
    isSpicy: true,
    nutrition: { calories: 450, protein: 15, carbs: 40, fat: 25 }
  },
  {
    id: 'w2',
    name: 'Paneer Tikka Wrap',
    description: 'A hearty wrap with grilled paneer tikka, fresh lettuce, mint chutney, and onions.',
    price: 129,
    category: 'Wraps',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop',
    prepTime: '15 mins',
    nutrition: { calories: 520, protein: 18, carbs: 42, fat: 28 }
  },
  {
    id: 'w3',
    name: 'Peri Peri Wrap',
    description: 'A spicy wrap with peri peri seasoning, fresh vegetables, and a creamy mayo drizzle.',
    price: 99,
    category: 'Wraps',
    image: 'https://images.unsplash.com/photo-1644704170910-a0cdf183649b?q=80&w=800&auto=format&fit=crop',
    prepTime: '10 mins',
    isSpicy: true,
    nutrition: { calories: 410, protein: 12, carbs: 38, fat: 22 }
  },
  {
    id: 'w4',
    name: 'Veg Wrap',
    description: 'Our best-selling wrap with fresh garden veggies, sweet corn, and a creamy dressing.',
    price: 79,
    category: 'Wraps',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop',
    prepTime: '8 mins',
    nutrition: { calories: 350, protein: 10, carbs: 45, fat: 15 }
  },
  {
    id: 'w5',
    name: 'Malai Paneer Tikka Wrap',
    description: 'A creamy and mild wrap with soft paneer tikka, light spices, and a touch of cream.',
    price: 139,
    category: 'Wraps',
    image: 'https://images.unsplash.com/photo-1623156346149-d5bec8b29d60?q=80&w=800&auto=format&fit=crop',
    prepTime: '15 mins',
    nutrition: { calories: 550, protein: 16, carbs: 40, fat: 32 }
  },
  // SANDWICHES
  {
    id: 's1',
    name: 'Inferno Paneer Melt Sandwich',
    description: 'A very spicy sandwich with marinated paneer and lots of melted cheese.',
    price: 99,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop',
    prepTime: '10 mins',
    isSpicy: true,
    nutrition: { calories: 480, protein: 16, carbs: 35, fat: 30 }
  },
  {
    id: 's2',
    name: 'Exotic Veg Sandwich',
    description: 'A premium sandwich with zucchini, bell peppers, olives, and a special veggie spread.',
    price: 69,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=800&auto=format&fit=crop',
    prepTime: '8 mins',
    nutrition: { calories: 320, protein: 8, carbs: 42, fat: 12 }
  },
  {
    id: 's3',
    name: 'Cheese Corn Sandwich',
    description: 'A classic grilled sandwich filled with sweet corn and a thick layer of melted cheese.',
    price: 79,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1539252554452-da376127f7ce?q=80&w=800&auto=format&fit=crop',
    prepTime: '8 mins',
    nutrition: { calories: 410, protein: 12, carbs: 38, fat: 24 }
  },
  {
    id: 's4',
    name: 'Blaze Burst Supreme',
    description: 'A supreme sandwich with a mix of spicy fillings, fresh veggies, and our secret "Blaze" sauce.',
    price: 89,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=800&auto=format&fit=crop',
    prepTime: '10 mins',
    nutrition: { calories: 450, protein: 14, carbs: 40, fat: 26 }
  },
  // FRENCH FRIES
  {
    id: 'f1',
    name: 'Peri Peri French Fries',
    description: 'Crispy golden fries tossed in a bold and spicy peri peri seasoning.',
    price: 69,
    category: 'Fries',
    image: 'https://images.unsplash.com/photo-1630384066252-11e1ed8f924b?q=80&w=800&auto=format&fit=crop',
    prepTime: '5 mins',
    isSpicy: true,
    nutrition: { calories: 350, protein: 4, carbs: 45, fat: 18 }
  },
  {
    id: 'f2',
    name: 'Salted French Fries',
    description: 'Classic golden fries seasoned with just the right amount of salt.',
    price: 59,
    category: 'Fries',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop',
    prepTime: '5 mins',
    nutrition: { calories: 310, protein: 3, carbs: 42, fat: 15 }
  },
  {
    id: 'f3',
    name: 'Peri Peri Cheese Fries',
    description: 'Spicy peri peri fries topped with a generous amount of warm melted cheese sauce.',
    price: 109,
    category: 'Fries',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=800&auto=format&fit=crop',
    prepTime: '7 mins',
    isSpicy: true,
    nutrition: { calories: 480, protein: 8, carbs: 48, fat: 28 }
  },
  {
    id: 'f4',
    name: 'Tandoori Paneer Fries',
    description: 'Crispy fries topped with tandoori paneer chunks and a special tandoori sauce.',
    price: 109,
    category: 'Fries',
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?q=80&w=800&auto=format&fit=crop',
    prepTime: '8 mins',
    nutrition: { calories: 510, protein: 12, carbs: 45, fat: 32 }
  },
  // BROWNIE
  {
    id: 'b1',
    name: 'Chocolate Brownie',
    description: 'A rich and fudgy chocolate brownie made with premium cocoa.',
    price: 39,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
    prepTime: '5 mins',
    nutrition: { calories: 280, protein: 4, carbs: 35, fat: 15 }
  },
  {
    id: 'b2',
    name: 'Walnut Brownie',
    description: 'Our classic fudgy chocolate brownie loaded with crunchy walnuts.',
    price: 59,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=800&auto=format&fit=crop',
    prepTime: '5 mins',
    nutrition: { calories: 320, protein: 6, carbs: 32, fat: 20 }
  },
  {
    id: 'b3',
    name: 'Chocolate Lava Brownie',
    description: 'A warm chocolate brownie with a gooey, molten chocolate center.',
    price: 69,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=800&auto=format&fit=crop',
    prepTime: '7 mins',
    nutrition: { calories: 350, protein: 5, carbs: 40, fat: 22 }
  },
  // WAFFLES
  {
    id: 'wf1',
    name: 'Red Velvet Waffle',
    description: 'A delicious red velvet waffle served with a smooth cream cheese drizzle.',
    price: 100,
    category: 'Waffles',
    image: 'https://images.unsplash.com/photo-1584278663993-df35599688ca?q=80&w=800&auto=format&fit=crop',
    prepTime: '12 mins',
    nutrition: { calories: 420, protein: 6, carbs: 55, fat: 18 }
  },
  {
    id: 'wf2',
    name: 'Classic Milk Waffle',
    description: 'A crisp golden waffle topped with smooth milk chocolate sauce.',
    price: 90,
    category: 'Waffles',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=800&auto=format&fit=crop',
    prepTime: '10 mins',
    nutrition: { calories: 380, protein: 5, carbs: 52, fat: 16 }
  },
  {
    id: 'wf3',
    name: 'Classic Dark Waffle',
    description: 'A crisp waffle topped with rich and intense dark chocolate sauce.',
    price: 80,
    category: 'Waffles',
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=800&auto=format&fit=crop',
    prepTime: '10 mins',
    nutrition: { calories: 360, protein: 5, carbs: 48, fat: 18 }
  },
  // DESERTS
  {
    id: 'd1',
    name: 'Hot Fudge Brownie Sundae',
    description: 'A warm brownie topped with vanilla ice cream, hot fudge sauce, and nuts.',
    price: 100,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800&auto=format&fit=crop',
    prepTime: '8 mins',
    nutrition: { calories: 550, protein: 7, carbs: 65, fat: 30 }
  },
  // PASTA
  {
    id: 'p1',
    name: 'Red Sauce Pasta',
    description: 'Pasta tossed in a tangy and spicy tomato sauce with fresh herbs.',
    price: 140,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop',
    prepTime: '15 mins',
    isSpicy: true,
    nutrition: { calories: 420, protein: 12, carbs: 60, fat: 14 }
  },
  {
    id: 'p2',
    name: 'White Sauce Pasta',
    description: 'Creamy pasta with a rich white sauce, garlic, and light herbs.',
    price: 150,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1645112481341-f5623ab278b8?q=80&w=800&auto=format&fit=crop',
    prepTime: '15 mins',
    nutrition: { calories: 580, protein: 14, carbs: 55, fat: 35 }
  },
  {
    id: 'p3',
    name: 'Mix Sauce Pasta',
    description: 'A perfect blend of our tangy red sauce and creamy white sauce.',
    price: 150,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800&auto=format&fit=crop',
    prepTime: '15 mins',
    nutrition: { calories: 510, protein: 13, carbs: 58, fat: 25 }
  },
  // VEG TANDOORI
  {
    id: 't1h',
    name: 'Malai Chaap (Half)',
    description: 'Soft soya chaap marinated in a creamy and mild spice blend, grilled for a smoky taste.',
    price: 215,
    category: 'Tandoori',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop',
    prepTime: '20 mins',
    nutrition: { calories: 350, protein: 22, carbs: 15, fat: 25 }
  },
  {
    id: 't1f',
    name: 'Malai Chaap (Full)',
    description: 'A full portion of our creamy malai chaap, grilled and served with mint chutney.',
    price: 300,
    category: 'Tandoori',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop',
    prepTime: '25 mins',
    nutrition: { calories: 650, protein: 40, carbs: 28, fat: 45 }
  },
  {
    id: 't2h',
    name: 'Paneer Tikka (Half)',
    description: 'Grilled paneer cubes marinated in a spicy spice blend, served with peppers and onions.',
    price: 215,
    category: 'Tandoori',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop',
    prepTime: '20 mins',
    isSpicy: true,
    nutrition: { calories: 380, protein: 20, carbs: 12, fat: 28 }
  },
  {
    id: 't2f',
    name: 'Paneer Tikka (Full)',
    description: 'A full portion of our spicy and smoky paneer tikka, grilled and served with mint chutney.',
    price: 300,
    category: 'Tandoori',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop',
    prepTime: '25 mins',
    isSpicy: true,
    nutrition: { calories: 720, protein: 38, carbs: 22, fat: 52 }
  },
  {
    id: 't3h',
    name: 'Chilli Paneer (Half)',
    description: 'Spicy Indo-Chinese paneer cubes tossed with bell peppers, onions, and a chilli glaze.',
    price: 215,
    category: 'Tandoori',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b547b4de5?q=80&w=800&auto=format&fit=crop',
    prepTime: '15 mins',
    isSpicy: true,
    nutrition: { calories: 380, protein: 18, carbs: 25, fat: 22 }
  },
  {
    id: 't3f',
    name: 'Chilli Paneer (Full)',
    description: 'A full portion of our spicy chilli paneer with a perfect balance of sweet and spicy flavors.',
    price: 300,
    category: 'Tandoori',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b547b4de5?q=80&w=800&auto=format&fit=crop',
    prepTime: '20 mins',
    isSpicy: true,
    nutrition: { calories: 720, protein: 34, carbs: 45, fat: 42 }
  },
  {
    id: 't4h',
    name: 'Malai Paneer Tikka (Half)',
    description: 'Soft paneer cubes marinated in a rich and creamy malai blend with mild spices.',
    price: 230,
    category: 'Tandoori',
    image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=800&auto=format&fit=crop',
    prepTime: '20 mins',
    nutrition: { calories: 420, protein: 19, carbs: 10, fat: 35 }
  },
  {
    id: 't4f',
    name: 'Malai Paneer Tikka (Full)',
    description: 'A full portion of our premium malai paneer tikka—creamy, mild, and melt-in-your-mouth.',
    price: 320,
    category: 'Tandoori',
    image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=800&auto=format&fit=crop',
    prepTime: '25 mins',
    nutrition: { calories: 800, protein: 36, carbs: 18, fat: 65 }
  },
  // KULCHAS
  {
    id: 'k1',
    name: 'Paneer Tikka Kulcha',
    description: 'A soft kulcha stuffed with smoky paneer tikka and fresh herbs, served with a spicy dip.',
    price: 109,
    category: 'Kulcha',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    prepTime: '15 mins',
    nutrition: { calories: 450, protein: 14, carbs: 55, fat: 20 }
  },
  {
    id: 'k2',
    name: 'Chilli Paneer Kulcha',
    description: 'A fusion kulcha stuffed with spicy chilli paneer, onions, and special spices.',
    price: 109,
    category: 'Kulcha',
    image: 'https://images.unsplash.com/photo-1626132646529-5003375a9b12?q=80&w=800&auto=format&fit=crop',
    prepTime: '15 mins',
    isSpicy: true,
    nutrition: { calories: 430, protein: 13, carbs: 52, fat: 18 }
  },
  {
    id: 'k3',
    name: 'Pull-a-part Kulcha',
    description: 'A unique kulcha designed to be pulled apart, filled with melted cheese and spices.',
    price: 120,
    category: 'Kulcha',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop',
    prepTime: '18 mins',
    nutrition: { calories: 520, protein: 15, carbs: 58, fat: 28 }
  },
  // BURGERS
  {
    id: 'bg1',
    name: 'Farmhouse Burger',
    description: 'A classic burger with a crispy veg patty, fresh lettuce, tomatoes, and our herb sauce.',
    price: 89,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    prepTime: '10 mins',
    nutrition: { calories: 450, protein: 12, carbs: 48, fat: 22 }
  },
  {
    id: 'bg2',
    name: 'Smoky Melt Paneer',
    description: 'A gourmet burger with a grilled paneer patty, smoky BBQ glaze, and a melted cheese center.',
    price: 119,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',
    prepTime: '12 mins',
    nutrition: { calories: 520, protein: 18, carbs: 40, fat: 32 }
  },
  {
    id: 'bg3',
    name: 'Korean Spicy Paneer',
    description: 'A bold burger with a crispy paneer patty, spicy Korean glaze, and a tangy slaw.',
    price: 129,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=800&auto=format&fit=crop',
    prepTime: '12 mins',
    isSpicy: true,
    nutrition: { calories: 490, protein: 16, carbs: 45, fat: 28 }
  },
  {
    id: 'bg4',
    name: 'Crispy Veg Burger',
    description: 'A classic burger with a golden-fried veg patty, crunchy lettuce, and creamy mayo.',
    price: 69,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=800&auto=format&fit=crop',
    prepTime: '8 mins',
    nutrition: { calories: 380, protein: 8, carbs: 50, fat: 18 }
  }
];

// Realistic Indian Teenagers (15-20 years old) for Kota Leaderboard
export const POTENTIAL_CUSTOMERS = [
  { id: 1, name: 'Aryan "The Beast"', avatar: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=300&auto=format&fit=crop' },
  { id: 2, name: 'Diya (Student Union)', avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=300&auto=format&fit=crop' },
  { id: 3, name: 'Ishaan (Kota Legend)', avatar: 'https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?q=80&w=300&auto=format&fit=crop' },
  { id: 4, name: 'Ananya V.', avatar: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=300&auto=format&fit=crop' },
  { id: 5, name: 'Rohan (Tech Teen)', avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?q=80&w=300&auto=format&fit=crop' },
  { id: 6, name: 'Navya K.', avatar: 'https://images.unsplash.com/photo-1594132225292-a03c3b5ec1ad?q=80&w=300&auto=format&fit=crop' },
  { id: 7, name: 'Shaurya (Sports Captain)', avatar: 'https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=300&auto=format&fit=crop' },
  { id: 8, name: 'Pari (Creative)', avatar: 'https://images.unsplash.com/photo-1619603364937-8d7af4163030?q=80&w=300&auto=format&fit=crop' },
  { id: 9, name: 'Vivaan (Musician)', avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=300&auto=format&fit=crop' },
  { id: 10, name: 'Myra (Influencer)', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop' },
  { id: 11, name: 'Kabir (Pro Gamer)', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop' },
  { id: 12, name: 'Sana (Scholar)', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop' },
  { id: 13, name: 'Arjun (Vlogger)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
  { id: 14, name: 'Tara S.', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop' },
  { id: 15, name: 'Vihaan Z.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    user: 'Aryan S.',
    rating: 5,
    comment: 'Best veg burger in Kota! The 70 rupee burger is actually a steal.',
    date: '2 days ago',
    avatar: 'https://picsum.photos/seed/aryan/100'
  },
  {
    id: 'r2',
    user: 'Priya K.',
    rating: 4,
    comment: 'Super fresh and loved the packaging. Delivery was quick too.',
    date: '1 week ago',
    avatar: 'https://picsum.photos/seed/priya/100'
  }
];
