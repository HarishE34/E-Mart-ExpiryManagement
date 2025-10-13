import React, { useState } from "react";
import NotificationsTab from "./NotificationsTab";

export default function StoreSettings() {
  const [activeTab, setActiveTab] = useState("store");
  const [form, setForm] = useState({
    storeName: "",
    storeId: "",
    address: "",
    phone: "",
    email: "",
    manager: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.storeName.trim()) err.storeName = "Store name is required";
    if (!form.storeId.trim()) err.storeId = "Store ID is required";
    if (!form.address.trim()) err.address = "Address is required";
    if (!form.phone.trim()) err.phone = "Phone number is required";
    if (!form.manager.trim()) err.manager = "Manager name is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      err.email = "Enter a valid email address";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (validate()) {
      alert("✅ Details saved successfully!");
      console.log(form);
    }
  };

  // Styles
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#EEEEEE",
    height: "80vh",
    width:"70vw",
    borderRadius:"10px",
    boxSizing: "border-box",
  };

  const tabsContainerStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  };

  const tabStyle = (isActive) => ({
    padding: "8px 16px",
    borderRadius: "6px",
    border: isActive ? "1px solid #007bff" : "1px solid #ddd",
    backgroundColor: isActive ? "#007bff" : "#fff",
    color: isActive ? "#fff" : "#000",
    cursor: "pointer",
    fontWeight: isActive ? "bold" : "normal",
  });

  const cardStyle = {
    backgroundColor: "#fff",
    
    padding: "20px",
    
    maxHeight: "75%", // prevent scrolling
    overflowY:"auto",
    boxSizing: "border-box",
  };

  const headerStyle = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "16px",
  };

  const formGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  };

  return (
    <div style={{height:"100vh",width:"100vw",display:"flex",flexDirection:"row"}}>
      {/*sidebar*/}
    <div style={{height:"100vh",width:"15vw",border:"1px solid blue"}}></div>

    <div style={{backgroundColor:"white",height:"100vh",width:"85vw",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    <div style={containerStyle}>
      <h2 style={{ margin: "auto",fontSize: "2rem",
    fontWeight: "600", }}>Settings</h2>
      <p style={{ color: "#555", marginBottom: "20px" ,fontSize:"19px"}}>
        Manage your store profile and preferences
      </p>

      {/* Tabs */}
      <div style={tabsContainerStyle}>
        <button
          onClick={() => setActiveTab("store")}
          style={tabStyle(activeTab === "store")}
        >
          Store Profile
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          style={tabStyle(activeTab === "notifications")}
        >
          Notifications
        </button>
      </div>

      {/* Content Card */}
      <div style={cardStyle}>
        {activeTab === "store" ? (
          <>
            <div style={headerStyle}>
              <span style={{ marginRight: "10px" }}>🏬</span> Store Information
            </div>

            <div style={formGridStyle}>
              <div>
                <label style={{ fontWeight: "bold" }}>Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={form.storeName}
                  onChange={handleChange}
                  placeholder="Enter store name"
                  style={inputStyle}
                />
                {errors.storeName && <p style={errorStyle}>{errors.storeName}</p>}
              </div>

              <div>
                <label style={{ fontWeight: "bold" }}>Store ID</label>
                <input
                  type="text"
                  name="storeId"
                  value={form.storeId}
                  onChange={handleChange}
                  placeholder="Enter store ID"
                  style={inputStyle}
                />
                {errors.storeId && <p style={errorStyle}>{errors.storeId}</p>}
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label style={{ fontWeight: "bold" }}>Address</label><span style={{ marginLeft: "1%" }}>📍</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    style={{ ...inputStyle, flex: 1 }}
                  />
                </div>
                {errors.address && <p style={errorStyle}>{errors.address}</p>}
              </div>

              <div>
                <label style={{ fontWeight: "bold" }}>Phone Number</label><span style={{ marginLeft: "1%" }}>📞</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                 
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    style={{ ...inputStyle, flex: 1 }}
                  />
                </div>
                {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
              </div>

              <div>
                <label style={{ fontWeight: "bold" }}>Email</label><span style={{ marginLeft: "1%" }}>✉️</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    style={{ ...inputStyle, flex: 1 }}
                  />
                </div>
                {errors.email && <p style={errorStyle}>{errors.email}</p>}
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label style={{ fontWeight: "bold" }}>Store Manager</label>
                <input
                  type="text"
                  name="manager"
                  value={form.manager}
                  onChange={handleChange}
                  placeholder="Enter manager name"
                  style={inputStyle}
                />
                {errors.manager && <p style={errorStyle}>{errors.manager}</p>}
              </div>
            </div>

            {/* Save Button */}
            <div style={{ textAlign: "right", marginTop: "25px" }}>
              <button onClick={handleSubmit} style={saveButtonStyle}>
                💾 Save Changes
              </button>
            </div>
          </>
        ) : (
          <div>
            <NotificationsTab/>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  backgroundColor: "#f7f7f7",
  marginTop: "5px",
  fontSize: "14px",
};

const errorStyle = {
  color: "red",
  fontSize: "12px",
  marginTop: "4px",
};

const saveButtonStyle = {
  backgroundColor: "#0aad00",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
};
