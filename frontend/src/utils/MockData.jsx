// src/utils/mockData.jsx

// -------------------------------
//   Mock Products Data
// -------------------------------
export const mockProducts = [
  {
    id: 'P001',
    name: 'Whole Milk 1L',
    category: 'Dairy',
    quantity: 45,
    manufactureDate: '2025-10-01',
    expiryDate: '2025-10-15',
    status: 'near-expiry',
    price: 3.99,
  },
  {
    id: 'P002',
    name: 'Greek Yogurt',
    category: 'Dairy',
    quantity: 30,
    manufactureDate: '2025-10-05',
    expiryDate: '2025-10-20',
    status: 'fresh',
    price: 4.5,
  },
  {
    id: 'P003',
    name: 'White Bread',
    category: 'Bakery',
    quantity: 20,
    manufactureDate: '2025-10-09',
    expiryDate: '2025-10-12',
    status: 'near-expiry',
    price: 2.99,
  },
  {
    id: 'P004',
    name: 'Croissants (6 pack)',
    category: 'Bakery',
    quantity: 15,
    manufactureDate: '2025-10-10',
    expiryDate: '2025-10-14',
    status: 'near-expiry',
    price: 5.99,
  },
  {
    id: 'P005',
    name: 'Orange Juice 2L',
    category: 'Beverages',
    quantity: 50,
    manufactureDate: '2025-10-01',
    expiryDate: '2025-11-01',
    status: 'fresh',
    price: 6.99,
  },
  {
    id: 'P006',
    name: 'Cheddar Cheese',
    category: 'Dairy',
    quantity: 25,
    manufactureDate: '2025-09-15',
    expiryDate: '2025-10-10',
    status: 'expired',
    price: 7.99,
  },
  {
    id: 'P007',
    name: 'Fresh Cream',
    category: 'Dairy',
    quantity: 18,
    manufactureDate: '2025-10-08',
    expiryDate: '2025-10-18',
    status: 'fresh',
    price: 3.5,
  },
  {
    id: 'P008',
    name: 'Butter 250g',
    category: 'Dairy',
    quantity: 40,
    manufactureDate: '2025-10-01',
    expiryDate: '2025-10-09',
    status: 'expired',
    price: 4.25,
  },
  {
    id: 'P009',
    name: 'Sourdough Bread',
    category: 'Bakery',
    quantity: 12,
    manufactureDate: '2025-10-10',
    expiryDate: '2025-10-16',
    status: 'fresh',
    price: 4.99,
  },
  {
    id: 'P010',
    name: 'Apple Juice 1L',
    category: 'Beverages',
    quantity: 35,
    manufactureDate: '2025-09-20',
    expiryDate: '2025-10-13',
    status: 'near-expiry',
    price: 4.99,
  },
  {
    id: 'P011',
    name: 'Muffins (4 pack)',
    category: 'Bakery',
    quantity: 22,
    manufactureDate: '2025-10-09',
    expiryDate: '2025-10-15',
    status: 'near-expiry',
    price: 6.5,
  },
  {
    id: 'P012',
    name: 'Almond Milk 1L',
    category: 'Beverages',
    quantity: 28,
    manufactureDate: '2025-10-05',
    expiryDate: '2025-11-05',
    status: 'fresh',
    price: 5.99,
  },
];

// -------------------------------
//   Utility Functions
// -------------------------------

// Days until expiry (relative to today)
export const getDaysUntilExpiry = (expiryDate) => {
  const today = new Date('2025-10-11');
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Text color styles for status labels
export const getStatusColor = (status) => {
  switch (status) {
    case 'fresh':
      return 'bg-green-100 text-green-700';
    case 'near-expiry':
      return 'bg-orange-100 text-orange-700';
    case 'expired':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// Badge (dot) colors for statuses
export const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'fresh':
      return 'bg-green-500';
    case 'near-expiry':
      return 'bg-orange-500';
    case 'expired':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};
