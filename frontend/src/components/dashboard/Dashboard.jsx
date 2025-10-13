import React from "react";
import {
  Package,
  AlertTriangle,
  XCircle,
  DollarSign,
  TrendingUp,
  Calendar,
  Lightbulb,
  MessageCircle,
} from "lucide-react";
import { Card } from "../ui/Card";
import { CardHeader } from "../ui/CardHeader";
import { CardTitle } from "../ui/CardTitle";
import { CardContent } from "../ui/CardContent";
import { cn } from "../../utils/cn";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockProducts, getDaysUntilExpiry } from "../../utils/MockData"; // <-- ensure proper import

// ----------------------- //
//  Inline Button & Progress
// ----------------------- //

function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline:
      "border border-gray-300 bg-transparent text-gray-800 hover:bg-gray-100",
    ghost: "hover:bg-gray-100 text-gray-700",
  };
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-10 px-6 text-base",
  };
  return (
    <button
      className={`${base} ${variants[variant] || ""} ${
        sizes[size] || ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Progress({ value = 0, className = "" }) {
  return (
    <div
      className={`relative h-2 w-full rounded-full bg-gray-200 ${className}`}
    >
      <div
        className="absolute top-0 left-0 h-full bg-green-600 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

// ----------------------- //
//      Dashboard
// ----------------------- //

export default function Dashboard() {
  const totalProducts = mockProducts.length;
  const nearExpiryProducts = mockProducts.filter(
    (p) => p.status === "near-expiry"
  ).length;
  const expiredProducts = mockProducts.filter(
    (p) => p.status === "expired"
  ).length;
  const totalStockValue = mockProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const expiryTrendsData = [
    { name: "This Week", count: 6 },
    { name: "Next Week", count: 8 },
    { name: "This Month", count: 15 },
    { name: "Next Month", count: 12 },
  ];

  const categoryData = [
    { name: "Dairy", value: 5, color: "#2ecc71" },
    { name: "Bakery", value: 4, color: "#f39c12" },
    { name: "Beverages", value: 3, color: "#3498db" },
  ];

  const healthScore = 72;

  const aiSuggestions = [
    {
      text: "Apply 20% discount on Whole Milk - expires in 4 days",
      priority: "high",
    },
    { text: "Restock Greek Yogurt - high demand product", priority: "medium" },
    {
      text: "Bakery category has highest wastage - review ordering",
      priority: "high",
    },
  ];

  return (
    <div className="w-[100vw] h-[100vh] flex">
      {/* Sidebar */}
      <div className="w-[15%] h-[100vh] bg-gray-800 text-white flex flex-col items-center p-4">
        
      </div>

      {/* Main Dashboard Content */}
      <div className="w-[85%] h-[100vh] overflow-y-auto p-6 bg-gray-50">
        
        {/* Top Bar: Search, Notification, Profile */}
        <div className="flex justify-between items-center mb-6">
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
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
              JD
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-gray-800 text-xl font-semibold">
              Dashboard Overview
            </h2>
            <p className="text-gray-600">
              Monitor your inventory health and expiry status
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 Days
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-600">
                Total Products
              </CardTitle>
              <Package className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-gray-800">{totalProducts}</div>
              <p className="text-xs text-gray-500 mt-1">
                Active inventory items
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-600">
                Near Expiry
              </CardTitle>
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-gray-800">{nearExpiryProducts}</div>
              <p className="text-xs text-gray-500 mt-1">Within 7 days</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-600">
                Expired Items
              </CardTitle>
              <XCircle className="w-5 h-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-gray-800">{expiredProducts}</div>
              <p className="text-xs text-gray-500 mt-1">Requires action</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-600">
                Stock Value
              </CardTitle>
              <DollarSign className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-gray-800">
                ${totalStockValue.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Total inventory worth
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Expiry Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Expiry Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={expiryTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2ecc71" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Health Score & AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Health Score */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Inventory Health Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke={
                        healthScore >= 70
                          ? "#2ecc71"
                          : healthScore >= 40
                          ? "#f39c12"
                          : "#e74c3c"
                      }
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(healthScore / 100) * 351.86} 351.86`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl text-gray-800">{healthScore}</span>
                    <span className="text-xs text-gray-500">/ 100</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Fresh Products</span>
                  <span className="text-green-600">85%</span>
                </div>
                <Progress value={85} />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Expiry Management</span>
                  <span className="text-orange-600">65%</span>
                </div>
                <Progress value={65} />
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                AI Smart Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      suggestion.priority === "high"
                        ? "bg-red-500"
                        : "bg-orange-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{suggestion.text}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Apply
                  </Button>
                </div>
              ))}
              <div className="pt-3 border-t">
                <Button variant="outline" className="w-full" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask AI Assistant
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockProducts.filter(p => p.status !== 'fresh').slice(0, 5).map((product) => {
                const daysLeft = getDaysUntilExpiry(product.expiryDate);
                return (
                  <div key={product.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        product.status === 'expired' ? 'bg-red-100' : 'bg-orange-100'
                      }`}>
                        {product.status === 'expired' ? (
                          <XCircle className="w-5 h-5 text-red-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500">
                          {product.status === 'expired' 
                            ? `Expired ${Math.abs(daysLeft)} days ago` 
                            : `Expires in ${daysLeft} days`}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {product.status === 'near-expiry' && (
                        <Button variant="outline" size="sm" className="text-orange-600">
                          Apply Discount
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="text-red-600">
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}