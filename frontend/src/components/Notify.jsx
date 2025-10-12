import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown, AlertTriangle, XCircle, List, Trash2, ArrowRight, Tag } from 'lucide-react';
import SideBar from './SideBar';


// --- Utility Functions (Kept for consistent styling) ---
// Note: Using 'rem' for responsive design is generally preferred over fixed 'vw' units, 
// but keeping these helpers for consistency with the original code structure.
const vw = (value) => `${value}vw`;
const vh = (value) => `${value}vh`;

// --- Main App Logic and Components ---

// Initial Data for the state
const initialAlertData = [
  { name: 'Butter 250g', id: 'P008', quantity: 60, price: '4.25', expiry: '10/06/2025', category: 'Dairy', severity: 2, isExpired: true, actions: ['Remove'] },
  { name: 'Cheddar Cheese', id: 'P002', quantity: 25, price: '7.99', expiry: '10/10/2025', category: 'Dairy', severity: 1, isExpired: true, actions: ['Remove'] },
  { name: 'White Bread', id: 'P001', quantity: 28, price: '2.99', expiry: '10/12/2025', category: 'Bakery', severity: 1, isExpired: false, actions: ['Discount', 'Clearance'] },
  { name: 'Apple Juice 1L', id: 'P014', quantity: 35, price: '4.99', expiry: '10/13/2025', category: 'Beverages', severity: 2, isExpired: false, actions: ['Discount', 'Clearance'] },
  { name: 'Croissants (6-pack)', id: 'P004', quantity: 15, price: '5.99', expiry: '10/14/2025', category: 'Bakery', severity: 3, isExpired: false, actions: ['Discount', 'Clearance'] },
  { name: 'Whole Milk 1L', id: 'P006', quantity: 45, price: '3.99', expiry: '10/15/2025', category: 'Dairy', severity: 4, isExpired: false, actions: ['Discount', 'Clearance'] },
  { name: 'Muffins (4 pack)', id: 'P011', quantity: 22, price: '6.50', expiry: '10/15/2025', category: 'Bakery', severity: 4, isExpired: false, actions: ['Discount', 'Clearance'] },
];

const Notify = () => {
  // --- State Hooks ---
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [alertData, setAlertData] = useState(initialAlertData);
  const [sortKey, setSortKey] = useState('urgency'); // urgency, expiry, quantity
  const [filterCategory, setFilterCategory] = useState('All Categories');

  // --- Action Handlers ---

  const handleRemove = useCallback((id) => {
    setAlertData(prevData => prevData.filter(item => item.id !== id));
  }, []);

  const handleAction = useCallback((id, action) => {
    // For Discount/Clearance, we will remove the item from the list 
    // and log a simulated action.
    console.log(`${action} applied to item ID: ${id}`);
    setAlertData(prevData => prevData.filter(item => item.id !== id));
  }, []);

  // --- Filtering and Sorting Logic ---

  const filteredAndSortedAlerts = useMemo(() => {
    let result = alertData;

    // 1. Filtering
    if (filterCategory !== 'All Categories') {
      result = result.filter(item => item.category === filterCategory);
    }

    // 2. Sorting
    result.sort((a, b) => {
      // Prioritize expired items first, regardless of sortKey
      if (a.isExpired && !b.isExpired) return -1;
      if (!a.isExpired && b.isExpired) return 1;

      switch (sortKey) {
        case 'expiry':
          // Sort by Expiry Date (Ascending: nearer expiry first)
          // We must convert 'DD/MM/YYYY' to a comparable date format (YYYY/MM/DD)
          const dateA = new Date(a.expiry.split('/').reverse().join('/'));
          const dateB = new Date(b.expiry.split('/').reverse().join('/'));
          return dateA.getTime() - dateB.getTime();

        case 'quantity':
          // Sort by Quantity (High to Low)
          return b.quantity - a.quantity;

        case 'urgency':
        default:
          // Sort by Severity/Urgency (Low severity number is higher urgency)
          return a.severity - b.severity;
      }
    });

    return result;
  }, [alertData, filterCategory, sortKey]);


  // --- Helper Data for Summary Cards ---
  const expiredCount = alertData.filter(item => item.isExpired).length;
  const nearExpiryCount = alertData.filter(item => !item.isExpired).length;
  const totalAlerts = alertData.length;


  // --- Component 1: Header ---
  const Header = () => (
    <div style={{ padding: `${vh(2)} ${vw(3.5)}` }}>
      <h1
        className="text-gray-900 font-extrabold"
        style={{ fontSize: vw(1.8), marginBottom: vh(0.5) }}
      >
        Expiry Alerts & Notifications
      </h1>
      <p
        className="text-gray-500"
        style={{ fontSize: vw(1) }}
      >
        Monitor and manage products nearing expiry
      </p>
      <div
        className="bg-gray-200"
        style={{ height: vh(0.1), marginTop: vh(1.5) }}
      ></div>
    </div>
  );

  // --- Component 2: SettingToggle ---
  const SettingToggle = ({ label, description, isActive, onToggle }) => (
    <div
      className="flex justify-between items-center bg-white transition-all hover:bg-gray-50"
      style={{ padding: `${vh(1)} 0`, borderBottom: `0.1vh solid #e5e7eb` }}
    >
      <div className="flex items-start">
        <span
          className="text-gray-900 mr-3 self-center"
          style={{ fontSize: vw(1.5) }}
        >
          {label === 'Email Alerts' ? '📧' : '📱'}
        </span>
        <div>
          <h4
            className="text-gray-900 font-semibold"
            style={{ fontSize: vw(1.1) }}
          >
            {label}
          </h4>
          <p
            className="text-gray-500"
            style={{ fontSize: vw(0.8) }}
          >
            {description}
          </p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex items-center ${isActive ? 'bg-indigo-600' : 'bg-gray-300'} rounded-full transition-colors ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        style={{ width: vw(3), height: vh(2.5) }}
      >
        <span
          className={`inline-block ${isActive ? 'translate-x-full ml-0.5' : 'translate-x-0.5'} bg-white rounded-full transition-transform ease-in-out duration-300 shadow-md`}
          style={{ width: vw(1.3), height: vh(2) }}
        ></span>
      </button>
    </div>
  );

  // --- Component 3: SummaryCard ---
  const SummaryCard = ({ title, value, icon: Icon, colorClass, iconBgClass }) => (
    <div
      className="flex-1 bg-white shadow-xl border-t-4 rounded-xl flex justify-between items-center transition-all hover:shadow-2xl"
      style={{
        height: vh(16),
        borderRadius: vw(0.5),
        borderTopColor: colorClass.includes('red') ? '#ef4444' : colorClass.includes('yellow') ? '#fbbf24' : '#6366f1',
        padding: `${vh(2.5)} ${vw(1.5)}`,
        minWidth: vw(20),
      }}
    >
      <div>
        <h3
          className="text-gray-500 font-medium tracking-wider"
          style={{ fontSize: vw(0.9), marginBottom: vh(0.5) }}
        >
          {title}
        </h3>
        <p
          className="font-black"
          style={{
            fontSize: vw(2.8),
            color: colorClass.includes('red') ? '#ef4444' : colorClass.includes('yellow') ? '#fbbf24' : '#6366f1'
          }}
        >
          {value}
        </p>
      </div>
      <div
        className={`flex items-center justify-center rounded-full ${iconBgClass}`}
        style={{ width: vw(3.5), height: vh(6.5), borderRadius: vw(2) }}
      >
        <Icon
          className={colorClass}
          style={{ width: vw(1.5), height: vh(2.8) }}
        />
      </div>
    </div>
  );

  // --- Component 4: AlertItem ---
  const AlertItem = ({ product }) => {
    let severityColor = '';
    let severityText = '';

    if (product.isExpired) {
      severityColor = 'bg-red-600 text-white shadow-lg shadow-red-200';
      severityText = `EXPIRED`;
    } else if (product.severity <= 3) {
      severityColor = 'bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-200';
      severityText = `${product.severity} days left`;
    } else {
      severityColor = 'bg-blue-600 text-white shadow-lg shadow-blue-200';
      severityText = `${product.severity} days left`;
    }

    const categoryColor = product.category === 'Dairy' ? 'bg-indigo-100 text-indigo-800' : product.category === 'Bakery' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800';

    return (
      <div
        className="flex items-center bg-white border border-gray-200 rounded-xl transition-shadow hover:shadow-lg"
        style={{ padding: `${vh(1.5)} ${vw(1.5)}`, marginBottom: vh(1.2) }}
      >
        {/* Main Alert Content Container: Using flexible columns */}
        <div className="flex-grow grid grid-cols-10 items-center gap-4">

          {/* Alert Indicator (Col 1) */}
          <div className="col-span-1 flex-shrink-0" style={{ minWidth: vw(1) }}>
            <AlertTriangle
              className={product.isExpired ? 'text-red-500' : 'text-yellow-500'}
              style={{ width: vw(1.5), height: vh(2.5) }}
            />
          </div>

          {/* Severity Tag (Col 2) */}
          <div className="col-span-2 flex-shrink-0">
            <div
              className={`font-bold ${severityColor} text-center uppercase`}
              style={{
                padding: `${vh(0.5)} ${vw(0.8)}`,
                borderRadius: vw(0.3),
                fontSize: vw(0.8),
                minWidth: vw(8)
              }}
            >
              {severityText}
            </div>
          </div>

          {/* Product Details (Col 3) */}
          <div className="col-span-2 flex-grow">
            <h4
              className="text-gray-900 font-bold truncate"
              style={{ fontSize: vw(1.1), marginBottom: vh(0.1) }}
            >
              {product.name}
            </h4>
            <p
              className="text-gray-500"
              style={{ fontSize: vw(0.8) }}
            >
              ID: {product.id}
            </p>
          </div>

          {/* Category Tag (Col 4) */}
          <div className="col-span-1 flex-shrink-0" style={{ minWidth: vw(5) }}>
            <span
              className={`font-semibold ${categoryColor} text-center inline-block w-full`}
              style={{
                padding: `${vh(0.4)} ${vw(0.8)}`,
                borderRadius: vw(0.3),
                fontSize: vw(0.8),
              }}
            >
              {product.category}
            </span>
          </div>

          {/* Qty, Price, Expiry (Col 5, 6, 7) - Using flex inside a single grid column for structure */}
          <div className="col-span-3 flex justify-between space-x-4 flex-shrink-0">
            {['Quantity', 'Price', 'Expiry Date'].map((label) => (
              <div
                key={label}
                className="flex flex-col flex-1"
              >
                <p
                  className="text-gray-500 font-medium truncate"
                  style={{ fontSize: vw(0.8) }}
                >
                  {label}
                </p>
                <p
                  className="text-gray-800 font-extrabold truncate"
                  style={{ fontSize: vw(1) }}
                >
                  {label === 'Quantity' ? `${product.quantity} units` : label === 'Price' ? `$${product.price}` : product.expiry}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Group (Col 8) */}
        <div className="flex space-x-2 items-center flex-shrink-0" style={{ marginLeft: vw(1) }}>
          {product.actions.includes('Discount') && (
            <button
              onClick={() => handleAction(product.id, 'Discount')}
              className="flex items-center justify-center font-semibold text-orange-600 border-2 border-orange-300 bg-orange-50 hover:bg-orange-100 transition-colors shadow-sm"
              style={{
                padding: `${vh(1)} ${vw(0.8)}`,
                borderRadius: vw(0.4),
                fontSize: vw(0.8),
              }}
            >
              <Tag style={{ width: vw(0.9), height: vh(1.6), marginRight: vw(0.3) }} />
              Discount
            </button>
          )}
          {product.actions.includes('Clearance') && (
            <button
              onClick={() => handleAction(product.id, 'Clearance')}
              className="flex items-center justify-center font-semibold text-indigo-600 border-2 border-indigo-300 bg-indigo-50 hover:bg-indigo-100 transition-colors shadow-sm"
              style={{
                padding: `${vh(1)} ${vw(0.8)}`,
                borderRadius: vw(0.4),
                fontSize: vw(0.8),
              }}
            >
              Clearance
              <ArrowRight style={{ width: vw(0.9), height: vh(1.6), marginLeft: vw(0.3) }} />
            </button>
          )}
          {product.actions.includes('Remove') && (
            <div
              style={{
                padding: '1vh 0.8vw',
                borderRadius: '0.4vw',
                fontSize: '0.8vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '2.6vh', /* Approximation: 2 * 1vh padding + a bit for the font/icon height */
                minWidth: '7vw', /* Approximation: 2 * 0.8vw padding + a bit for the text/icon width */
              }}
            >
            </div>
          )}
          {product.actions.includes('Remove') && (
            <button
              onClick={() => handleRemove(product.id)}
              className="flex items-center justify-center font-semibold text-red-600 border-2 border-red-300 bg-red-50 hover:bg-red-100 transition-colors shadow-sm"
              style={{
                padding: `${vh(1)} ${vw(0.8)}`,
                borderRadius: vw(0.4),
                fontSize: vw(0.8),
              }}
            >
              <Trash2 style={{ width: vw(0.9), height: vh(1.6), marginRight: vw(0.3) }} />
              Remove
            </button>
          )}
        </div>
      </div>
    );
  };


  return (
    <div className='flex h-screen w-screen overflow-hidden font-inter'>
      {/* Sidebar (Fixed width) */}
      <SideBar />

      {/* Main Content Area (Takes up remaining space, prevents horizontal overflow) */}
      <div
        className="flex-1 bg-gray-50 overflow-y-auto" // FLEX-1 FIX: Takes remaining space
        style={{ fontSize: vw(1.1) }}
      >
        {/* Top Bar: Search, Notification, Profile */}
        <div className="flex justify-between items-center mb-6 px-[1vw] pt-[3vh]">
        <div className="relative w-64">
            <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Search products, categories..."
            />
        </div>
        <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 hover:bg-gray-200 transition">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path
                d="M15 17h5l-1.405-1.405M19.595 15.595A7.97 7.97 0 0021 12A8 8 0 103 12c0 1.43.38 2.785 1.048 3.936M3 21h18"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* Notification badge (optional) */}
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </button>
            {/* Profile Avatar */}
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
            JD
            </div>
        </div>
        </div>
        <Header />

        {/* Main Content Container: Fluid width, controlled internal padding */}
        <div
          className="w-full mx-auto"
          style={{ padding: `0 ${vw(3.5)}` }}
        >
          {/* 1. Notification Settings */}
          <section
            className="bg-white border border-gray-200 shadow-lg rounded-xl"
            style={{ marginBottom: vh(3), padding: `${vh(2.5)} ${vw(2.5)}` }}
          >
            <h2
              className="text-gray-800 font-extrabold"
              style={{ fontSize: vw(1.2), marginBottom: vh(1.8) }}
            >
              Notification Settings
            </h2>
            <SettingToggle
              label="Email Alerts"
              description="Receive expiry notifications via email"
              isActive={emailAlerts}
              onToggle={() => setEmailAlerts(!emailAlerts)}
            />
            <SettingToggle
              label="SMS Alerts"
              description="Receive expiry notifications via SMS"
              isActive={smsAlerts}
              onToggle={() => setSmsAlerts(!smsAlerts)}
            />
          </section>

          {/* 2. Filters (Functional) */}
          <section
            className="flex space-x-8 bg-white border border-gray-200 shadow-lg rounded-xl"
            style={{ marginBottom: vh(3), padding: `${vh(2.5)} ${vw(2.5)}` }}
          >
            {/* Filter 1: Sort by */}
            <div style={{ flex: '1 1 20vw', minWidth: vw(15) }}>
              <label
                className="block text-gray-600 font-medium mb-1"
                style={{ fontSize: vw(0.9) }}
              >
                Sort by
              </label>
              <div className="relative">
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value)}
                  className="block w-full h-[vh] border border-gray-300 bg-white appearance-none pr-10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-shadow shadow-inner"
                  style={{ height: vh(5.5), padding: `${vh(1)} ${vw(1)}`, borderRadius: vw(0.3), fontSize: vw(1) }}
                >
                  <option value="urgency">Urgency (High to Low)</option>
                  <option value="expiry">Expiry Date (Ascending)</option>
                  <option value="quantity">Quantity (High to Low)</option>
                </select>
                <ChevronDown
                  className="absolute text-gray-500 pointer-events-none"
                  style={{ right: vw(0.5), top: vh(1.2), width: vw(1), height: vh(2) }}
                />
              </div>
            </div>

            {/* Filter 2: Filter by Category */}
            <div style={{ flex: '1 1 20vw', minWidth: vw(15) }}>
              <label
                className="block text-gray-600 font-medium mb-1"
                style={{ fontSize: vw(0.9) }}
              >
                Filter by Category
              </label>
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="block w-full border border-gray-300 bg-white appearance-none pr-10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-shadow shadow-inner"
                  style={{ height: vh(5.5), padding: `${vh(1)} ${vw(1)}`, borderRadius: vw(0.3), fontSize: vw(1) }}
                >
                  <option>All Categories</option>
                  <option>Dairy</option>
                  <option>Bakery</option>
                  <option>Beverages</option>
                </select>
                <ChevronDown
                  className="absolute text-gray-500 pointer-events-none"
                  style={{ right: vw(0.5), top: vh(1.2), width: vw(1), height: vh(2) }}
                />
              </div>
            </div>

            <div style={{ flex: '2 1 auto' }}></div>
          </section>

          {/* 3. Summary Cards (Data updated dynamically based on current alerts in state) */}
          <section
            className="flex justify-between space-x-4"
            style={{ marginBottom: vh(4) }}
          >
            <SummaryCard
              title="NEAR EXPIRY"
              value={nearExpiryCount}
              icon={AlertTriangle}
              colorClass="text-yellow-600"
              iconBgClass="bg-yellow-100"
            />
            <SummaryCard
              title="EXPIRED"
              value={expiredCount}
              icon={XCircle}
              colorClass="text-red-600"
              iconBgClass="bg-red-100"
            />
            <SummaryCard
              title="TOTAL ALERTS"
              value={totalAlerts}
              icon={List}
              colorClass="text-indigo-600"
              iconBgClass="bg-indigo-100"
            />
          </section>

          {/* 4. Active Alerts List (Functional) */}
          <section>
            <h2
              className="text-gray-800 font-extrabold"
              style={{ fontSize: vw(1.2), marginBottom: vh(2) }}
            >
              Active Alerts ({filteredAndSortedAlerts.length})
            </h2>
            <div className="space-y-4">
              {filteredAndSortedAlerts.map((alert) => (
                <AlertItem
                  key={alert.id}
                  product={alert}
                />
              ))}
              {filteredAndSortedAlerts.length === 0 && (
                <p className="text-gray-500 text-center py-10 bg-white rounded-xl shadow-md">
                  No active alerts matching the current filter and sort criteria.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Notify;