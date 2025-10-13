import React, { useState } from "react";

const AddProductForm = ({ onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    quantity: "",
    price: "",
    mfg: "",
    exp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name) {
      alert("Please fill all required fields!");
      return;
    }
    const newProduct = {
      id: formData.id,
      name: formData.name,
      price: `$${formData.price}`,
      category: formData.category,
      quantity: parseInt(formData.quantity),
      mfg: formData.mfg,
      exp: formData.exp,
    };
    onAddProduct(newProduct);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          width: "45%",
          padding: "3%",
          borderRadius: "2vh",
          boxShadow: "0 0 2vh rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.5vh",
            right: "1.5vh",
            background: "none",
            border: "none",
            fontSize: "3vh",
            cursor: "pointer",
            color: "#6b7280",
          }}
        >
          &times;
        </button>

        <h2 style={{ fontSize: "3vh", marginBottom: "1vh" }}>Add New Product</h2>
        <p style={{ color: "#6b7280", marginBottom: "3vh" }}>
          Enter product details and expiry information
        </p>

        {/* Form Fields */}
        <div style={{ display: "flex", gap: "3%", marginBottom: "2vh" }}>
          <div style={{ width: "50%" }}>
            <label>Product ID</label>
            <input
              name="id"
              placeholder="P001"
              value={formData.id}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={{ width: "50%" }}>
            <label>Product Name</label>
            <input
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "3%", marginBottom: "2vh" }}>
          <div style={{ width: "50%" }}>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select category</option>
              <option value="Dairy">Dairy</option>
              <option value="Bakery">Bakery</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>
          <div style={{ width: "50%" }}>
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="0"
              value={formData.quantity}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "3%", marginBottom: "2vh" }}>
          <div style={{ width: "50%" }}>
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={{ width: "50%" }}>
            <label>Manufacture Date</label>
            <input
              type="date"
              name="mfg"
              value={formData.mfg}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: "3vh" }}>
          <label>Expiry Date</label>
          <input
            type="date"
            name="exp"
            value={formData.exp}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "2vh" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: "#e5e7eb",
              color: "#111827",
              border: "none",
              padding: "1.5vh 3vh",
              borderRadius: "1.5vh",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              padding: "1.5vh 3vh",
              borderRadius: "1.5vh",
              cursor: "pointer",
            }}
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "1.5vh",
  borderRadius: "1.5vh",
  border: "1px solid #d1d5db",
  fontSize: "2vh",
  marginTop: "1vh",
};

export default AddProductForm;