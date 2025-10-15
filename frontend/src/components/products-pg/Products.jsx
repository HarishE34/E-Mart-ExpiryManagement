import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import AddProductForm from "./ProdPopup"; // Popup component

const ProductsPage = () => {
  const initialProducts = [
    { id: "P001", name: "Whole Milk 1L", price: "$3.99", category: "Dairy", quantity: 45, mfg: "2025-10-01", exp: "2025-10-15" },
    { id: "P002", name: "Greek Yogurt", price: "$4.5", category: "Dairy", quantity: 30, mfg: "2025-10-05", exp: "2025-10-20" },
    { id: "P003", name: "White Bread", price: "$2.99", category: "Bakery", quantity: 20, mfg: "2025-10-09", exp: "2025-10-12" },
    { id: "P004", name: "Croissants (6 pack)", price: "$5.99", category: "Bakery", quantity: 15, mfg: "2025-10-10", exp: "2025-10-14" },
    { id: "P005", name: "Orange Juice 2L", price: "$6.99", category: "Beverages", quantity: 50, mfg: "2025-10-01", exp: "2025-11-01" },
    { id: "P006", name: "Cheddar Cheese", price: "$7.99", category: "Dairy", quantity: 25, mfg: "2025-09-15", exp: "2025-10-10" },
  ];

  const [allProducts, setAllProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // ✅ Calculate days left
  const calculateDaysLeft = (expiryDate) => {
    const today = new Date();
    const exp = new Date(expiryDate);
    const diffTime = exp - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatus = (daysLeft) => {
    if (daysLeft < 0) return "expired";
    if (daysLeft <= 5) return "near expiry";
    return "fresh";
  };

  const getStatusStyle = (status) => {
    if (status === "fresh") return { backgroundColor: "#d1fae5", color: "#065f46" };
    if (status === "near expiry") return { backgroundColor: "#fef3c7", color: "#92400e" };
    if (status === "expired") return { backgroundColor: "#fee2e2", color: "#b91c1c" };
    return {};
  };

  // ✅ Filter products
  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const daysLeft = calculateDaysLeft(p.exp);
    const status = getStatus(daysLeft);
    const matchesStatus =
      statusFilter === "All Status" ||
      (statusFilter === "Fresh" && status === "fresh") ||
      (statusFilter === "Near Expiry" && status === "near expiry") ||
      (statusFilter === "Expired" && status === "expired");
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ✅ Add new product
  const handleAddProduct = (newProduct) => {
    if (!newProduct.price.startsWith("$")) {
      newProduct.price = `$${newProduct.price}`;
    }
    setAllProducts((prev) => [...prev, newProduct]);
    setShowAddProduct(false);
  };

  // ✅ Edit product
  const handleEditProduct = (updatedProduct) => {
    setAllProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditProduct(null);
  };

  // ✅ Delete product
  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      setAllProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    
      <div
        style={{
          width: "85%",
          padding: "2%",
          height: "100vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Top Bar */}
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
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15 17h5l-1.405-1.405M19.595 15.595A7.97 7.97 0 0021 12A8 8 0 103 12c0 1.43.38 2.785 1.048 3.936M3 21h18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
              JD
            </div>
          </div>
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2%",
          }}
        >
          <h2 style={{ fontSize: "3vh", fontWeight: "bold", color: "#1f2937" }}>
            Product Management
          </h2>
          <button
            style={{
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "1.5vh",
              padding: "1vh 2vh",
              fontSize: "2vh",
              cursor: "pointer",
            }}
            onClick={() => setShowAddProduct(true)}
          >
            + Add Product
          </button>
        </div>

        {/* Search & Filters */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "3%",
            gap: "2%",
          }}
        >
          <input
            type="text"
            placeholder="Search by product name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "70%",
              padding: "1.5vh",
              borderRadius: "1.5vh",
              border: "1px solid #d1d5db",
              fontSize: "2vh",
            }}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              width: "12%",
              padding: "1.5vh",
              borderRadius: "1.5vh",
              border: "1px solid #d1d5db",
              fontSize: "2vh",
            }}
          >
            <option>All</option>
            <option>Dairy</option>
            <option>Bakery</option>
            <option>Beverages</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              width: "12%",
              padding: "1.5vh",
              borderRadius: "1.5vh",
              border: "1px solid #d1d5db",
              fontSize: "2vh",
            }}
          >
            <option>All Status</option>
            <option>Fresh</option>
            <option>Near Expiry</option>
            <option>Expired</option>
          </select>
        </div>

        {/* Product Table */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "2vh",
            padding: "2%",
            boxShadow: "0 0 1vh rgba(0,0,0,0.1)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                {[
                  "Product ID",
                  "Name",
                  "Category",
                  "Quantity",
                  "Mfg Date",
                  "Expiry Date",
                  "Days Left",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: "1.5vh",
                      fontSize: "2vh",
                      color: "#6b7280",
                      textTransform: "uppercase",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => {
                  const daysLeft = calculateDaysLeft(p.exp);
                  const status = getStatus(daysLeft);
                  return (
                    <tr key={p.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "1.5vh", fontSize: "2vh" }}>{p.id}</td>
                      <td style={{ padding: "1.5vh", fontSize: "2vh" }}>
                        {p.name}
                        <div style={{ fontSize: "1.8vh", color: "#9ca3af" }}>{p.price}</div>
                      </td>
                      <td style={{ padding: "1.5vh", fontSize: "2vh" }}>{p.category}</td>
                      <td style={{ padding: "1.5vh", fontSize: "2vh" }}>{p.quantity}</td>
                      <td style={{ padding: "1.5vh", fontSize: "2vh" }}>{p.mfg}</td>
                      <td style={{ padding: "1.5vh", fontSize: "2vh" }}>{p.exp}</td>
                      <td style={{ padding: "1.5vh", fontSize: "2vh" }}>
                        {daysLeft >= 0 ? `${daysLeft} days` : `${Math.abs(daysLeft)} days ago`}
                      </td>
                      <td style={{ padding: "1.5vh" }}>
                        <span
                          style={{
                            ...getStatusStyle(status),
                            padding: "0.8vh 1.2vh",
                            borderRadius: "1vh",
                            fontSize: "1.8vh",
                            fontWeight: "500",
                          }}
                        >
                          {status}
                        </span>
                      </td>
                      <td style={{ padding: "1.5vh" }}>
                        <button
                          onClick={() => setEditProduct(p)}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            fontSize: "3vh",
                            cursor: "pointer",
                            marginRight: "1vh",
                          }}
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            fontSize: "3vh",
                            cursor: "pointer",
                            color: "#ef4444",
                          }}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      padding: "4vh",
                      fontSize: "2.2vh",
                      color: "#9ca3af",
                      backgroundColor: "#f9fafb",
                      fontWeight: "500",
                    }}
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Add / Edit Popup */}
        {(showAddProduct || editProduct) && (
          <AddProductForm
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onClose={() => {
              setShowAddProduct(false);
              setEditProduct(null);
            }}
            editData={editProduct}
          />
        )}
      </div>
    
  );
};

export default ProductsPage;
