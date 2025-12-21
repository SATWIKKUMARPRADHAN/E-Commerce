// Dummy data for development
// TODO: Replace with MongoDB queries after connecting database

export const dummyUsers = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    mobile: '1234567890',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-12-10')
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    mobile: '1234567891',
    createdAt: new Date('2024-02-20'),
    lastLogin: new Date('2024-12-09')
  },
  {
    _id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    mobile: '1234567892',
    createdAt: new Date('2024-03-10'),
    lastLogin: new Date('2024-12-08')
  }
];

export const dummyProducts = [
  {
    _id: 'p1',
    name: 'Laptop',
    price: 999.99,
    category: 'Electronics',
    stock: 50
  },
  {
    _id: 'p2',
    name: 'Smartphone',
    price: 699.99,
    category: 'Electronics',
    stock: 100
  },
  {
    _id: 'p3',
    name: 'Headphones',
    price: 149.99,
    category: 'Electronics',
    stock: 200
  },
  {
    _id: 'p4',
    name: 'T-Shirt',
    price: 29.99,
    category: 'Clothing',
    stock: 150
  },
  {
    _id: 'p5',
    name: 'Sneakers',
    price: 89.99,
    category: 'Footwear',
    stock: 75
  }
];

export const dummyOrders = [
  {
    _id: 'o1',
    userId: '1',
    orderId: 'ORD-2024-001',
    products: [
      { productId: 'p1', name: 'Laptop', quantity: 1, price: 999.99 },
      { productId: 'p3', name: 'Headphones', quantity: 2, price: 149.99 }
    ],
    totalAmount: 1299.97,
    paymentMethod: 'Credit Card',
    orderStatus: 'Delivered',
    createdAt: new Date('2024-11-15')
  },
  {
    _id: 'o2',
    userId: '1',
    orderId: 'ORD-2024-002',
    products: [
      { productId: 'p2', name: 'Smartphone', quantity: 1, price: 699.99 }
    ],
    totalAmount: 699.99,
    paymentMethod: 'PayPal',
    orderStatus: 'Processing',
    createdAt: new Date('2024-12-01')
  },
  {
    _id: 'o3',
    userId: '2',
    orderId: 'ORD-2024-003',
    products: [
      { productId: 'p4', name: 'T-Shirt', quantity: 3, price: 29.99 },
      { productId: 'p5', name: 'Sneakers', quantity: 1, price: 89.99 }
    ],
    totalAmount: 179.96,
    paymentMethod: 'Debit Card',
    orderStatus: 'Shipped',
    createdAt: new Date('2024-12-05')
  },
  {
    _id: 'o4',
    userId: '2',
    orderId: 'ORD-2024-004',
    products: [
      { productId: 'p1', name: 'Laptop', quantity: 1, price: 999.99 }
    ],
    totalAmount: 999.99,
    paymentMethod: 'Credit Card',
    orderStatus: 'Delivered',
    createdAt: new Date('2024-11-20')
  },
  {
    _id: 'o5',
    userId: '3',
    orderId: 'ORD-2024-005',
    products: [
      { productId: 'p3', name: 'Headphones', quantity: 1, price: 149.99 }
    ],
    totalAmount: 149.99,
    paymentMethod: 'Credit Card',
    orderStatus: 'Pending',
    createdAt: new Date('2024-12-10')
  }
];

