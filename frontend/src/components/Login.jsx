import React, { useState } from 'react';
import { Mail, Lock, ShoppingCart, Eye, EyeOff } from 'lucide-react';

export function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('admin');
  const [tab, setTab] = useState('login');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin && onLogin();
  };

  // Inline style objects
  const gradientBg = {
    minHeight: "100vh",
    padding: 16,
    background: "linear-gradient(135deg, #f0fdf4 0%, #fff 50%, #f0fdf4 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const cardStyle = {
    padding: 32,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 30px rgba(0,0,0,0.07)",
    width: "100%",
    maxWidth: 480,
  };
  const inputStyle = {
    width: "100%",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    padding: "8px 12px",
    marginBottom: 4,
    fontSize: 16,
  };
  const labelStyle = { marginBottom: 2 };
  const greenButton = {
    width: "100%",
    border: "none",
    borderRadius: 8,
    background: "#16a34a",
    color: "#fff",
    padding: "10px 0",
    cursor: "pointer",
    fontSize: 16,
    marginTop: 12,
  };
  const triggerBtn = act => ({
    flex: 1,
    padding: 8,
    background: act ? "#d1fae5" : "transparent",
    color: "#16a34a",
    border: "none",
    borderBottom: act ? "2px solid #16a34a" : "2px solid transparent",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 16,
  });
  const leftBrandingStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 24,
    minWidth: 0
    // You may want to conditionally hide on small screens with media queries
    // For simplicity this is visible always
  };

  return (
    <div style={gradientBg}>
      <div style={{
        width: "100%", maxWidth: 1200,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center"
      }}>
        {/* Left side - Branding */}
        <div style={leftBrandingStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 64,
              height: 64,
              background: "linear-gradient(135deg,#4ade80,#16a34a)",
              borderRadius: 24,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <ShoppingCart color="#fff" size={40} />
            </div>
            <div>
              <div style={{ color: "#16a34a", fontWeight: 700, fontSize: 28 }}>E-Mart</div>
              <div style={{ color: "#6b7280" }}>Expiry Product Management</div>
            </div>
          </div>
          <div>
            <div style={{ color: "#1f2937", fontWeight: 600, fontSize: 22 }}>Smart Inventory Management</div>
            <div style={{ color: "#4b5563", marginBottom: 18 }}>
              Automatically track expiry-dated and perishable items. Reduce waste, 
              increase profits, and never miss an expiry date again.
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 40, height: 40, background: "#d1fae5",
                  borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center"
                }}><span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span></div>
                <span style={{ color: "#374151" }}>Real-time expiry tracking</span>
              </div>
              <div style={{ display: 'flex', alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 40, height: 40, background: "#ffedd5",
                  borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center"
                }}><span style={{ color: "#ea580c", fontWeight: 700 }}>✓</span></div>
                <span style={{ color: "#374151" }}>Smart alerts & notifications</span>
              </div>
              <div style={{ display: 'flex', alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 40, height: 40, background: "#fee2e2",
                  borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center"
                }}><span style={{ color: "#dc2626", fontWeight: 700 }}>✓</span></div>
                <span style={{ color: "#374151" }}>AI-powered insights</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right side - Login/Signup Forms */}
        <div style={cardStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginBottom: 24 }}>
            <button style={triggerBtn(tab === "login")} type="button" onClick={() => setTab("login")}>Login</button>
            <button style={triggerBtn(tab === "signup")} type="button" onClick={() => setTab("signup")}>Sign Up</button>
          </div>

          {/* Login Tab */}
          {tab === "login" && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ color: "#1f2937", fontWeight: 600, fontSize: 20 }}>Welcome Back</div>
                <div style={{ color: "#6b7280", fontSize: 14 }}>Enter your credentials to access your account</div>
              </div>
              <div>
                <label style={labelStyle}>Role</label>
                <select
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value)}
                  style={inputStyle}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af"
                  }}><Mail size={20} color="#9ca3af" /></span>
                  <input
                    type="email"
                    style={{ ...inputStyle, paddingLeft: 36 }}
                    placeholder="admin@emart.com"
                    defaultValue="admin@emart.com"
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af"
                  }}><Lock size={20} color="#9ca3af" /></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    style={{ ...inputStyle, paddingLeft: 36, paddingRight: 36 }}
                    placeholder="••••••••"
                    defaultValue="password"
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", background: "none", border: "none"
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  <input type="checkbox" style={{ borderRadius: 4 }} />
                  <span style={{ color: "#6b7280", fontSize: 14 }}>Remember me</span>
                </label>
                <button type="button" style={{ color: "#16a34a", background: "none", border: "none", fontSize: 14, textDecoration: "underline", cursor: "pointer" }}>
                  Forgot Password?
                </button>
              </div>
              <button type="submit" style={greenButton}>Sign In</button>
            </form>
          )}
          {/* Signup Tab */}
          {tab === "signup" && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ color: "#1f2937", fontWeight: 600, fontSize: 20 }}>Create Account</div>
                <div style={{ color: "#6b7280", fontSize: 14 }}>Fill in your details to get started</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input
                    type="text"
                    style={inputStyle}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input
                    type="text"
                    style={inputStyle}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Role</label>
                <select defaultValue="staff" style={inputStyle}>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af"
                  }}><Mail size={20} color="#9ca3af" /></span>
                  <input
                    type="email"
                    style={{ ...inputStyle, paddingLeft: 36 }}
                    placeholder="john@emart.com"
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af"
                  }}><Lock size={20} color="#9ca3af" /></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    style={{ ...inputStyle, paddingLeft: 36, paddingRight: 36 }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", background: "none", border: "none"
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input type="checkbox" style={{ borderRadius: 4 }} required />
                <span style={{ color: "#6b7280", fontSize: 14 }}>
                  I agree to the Terms & Conditions
                </span>
              </div>
              <button type="submit" style={greenButton}>Create Account</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
