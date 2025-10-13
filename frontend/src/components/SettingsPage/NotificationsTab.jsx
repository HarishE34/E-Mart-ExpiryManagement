import React, { useState } from "react";

export default function NotificationsTab() {
  const [preferences, setPreferences] = useState({
    autoAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    voiceAlerts: false,
    alertThreshold: "7 days",
  });

  const handleToggle = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectChange = (e) => {
    setPreferences((prev) => ({ ...prev, alertThreshold: e.target.value }));
  };

  const handleSave = () => {
    alert("Preferences saved successfully!");
    console.log("Saved Preferences:", preferences);
  };

  
  const headerStyle = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "16px",
  };

  const rowStyle = {
    display: "flex",
    
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e5e7eb",
    padding: "1.45% 0",
  };

  const rowTextStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const titleStyle = {
    fontWeight: "bold",
  };

  const descStyle = {
    fontSize: "15px",
    color: "#6b7280",
  };

  const toggleStyle = (active) => ({
    width: "48px",
    height: "24px",
    borderRadius: "12px",
    position: "relative",
    backgroundColor: active ? "#22c55e" : "#d1d5db",
    cursor: "pointer",
    transition: "background-color 0.3s",
  });

  const knobStyle = (active) => ({
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    position: "absolute",
    top: "4px",
    left: "4px",
    transition: "transform 0.3s",
    transform: active ? "translateX(24px)" : "translateX(0)",
  });

  const selectStyle = {
    width: "100%",
    marginTop: "8px",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    fontSize: "14px",
  };

  const saveButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#0aad00",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "16px",
  };

  return (
    <div >
      <h2 style={headerStyle}>Notification Preferences</h2>

      {/* Auto Alerts */}
      <div style={rowStyle}>
        <div style={rowTextStyle}>
          <span style={titleStyle}>Auto Alerts</span>
          <span style={descStyle}>
            Automatically send alerts for products nearing expiry
          </span>
        </div>
        <div style={toggleStyle(preferences.autoAlerts)} onClick={() => handleToggle("autoAlerts")}>
          <span style={knobStyle(preferences.autoAlerts)} />
        </div>
      </div>

      {/* Email Notifications */}
      <div style={rowStyle}>
        <div style={rowTextStyle}>
          <span style={titleStyle}>Email Notifications</span>
          <span style={descStyle}>Receive expiry alerts via email</span>
        </div>
        <div
          style={toggleStyle(preferences.emailNotifications)}
          onClick={() => handleToggle("emailNotifications")}
        >
          <span style={knobStyle(preferences.emailNotifications)} />
        </div>
      </div>

      {/* SMS Notifications */}
      <div style={rowStyle}>
        <div style={rowTextStyle}>
          <span style={titleStyle}>SMS Notifications</span>
          <span style={descStyle}>Receive expiry alerts via SMS</span>
        </div>
        <div
          style={toggleStyle(preferences.smsNotifications)}
          onClick={() => handleToggle("smsNotifications")}
        >
          <span style={knobStyle(preferences.smsNotifications)} />
        </div>
      </div>

      {/* Voice Alerts */}
      <div style={rowStyle}>
        <div style={rowTextStyle}>
          <span style={titleStyle}>Voice Alerts</span>
          <span style={descStyle}>
            Enable voice announcements for critical expiry alerts
          </span>
        </div>
        <div
          style={toggleStyle(preferences.voiceAlerts)}
          onClick={() => handleToggle("voiceAlerts")}
        >
          <span style={knobStyle(preferences.voiceAlerts)} />
        </div>
      </div>

      {/* Alert Threshold */}
      <div style={{ paddingTop: "16px", borderBottom: "1px solid #e5e7eb" }}>
        <label style={{ fontWeight: "bold" }}>Alert Threshold (days)</label>
        <select value={preferences.alertThreshold} onChange={handleSelectChange} style={selectStyle}>
          <option>3 days</option>
          <option>7 days</option>
          <option>14 days</option>
          <option>30 days</option>
        </select>
        <p style={{ fontSize: "15px", color: "#6b7280", marginTop: "4px" }}>
          Alert when products are within this many days of expiry
        </p>
      </div>

      {/* Save Button */}
      <div style={{ textAlign: "right" }}>
        <button style={saveButtonStyle} onClick={handleSave}>
          💾 Save Preferences
        </button>
      </div>
    </div>
  );
}
