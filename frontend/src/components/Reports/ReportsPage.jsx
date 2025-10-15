import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import SideBar from "../SideBar";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("Wastage");
  const [timeRange, setTimeRange] = useState("30");
  const [category, setCategory] = useState("All");
  const [toast, setToast] = useState("");

  const data = {
    Bakery: [
      { name: "Jun", value: 12 },
      { name: "Jul", value: 22 },
      { name: "Aug", value: 15 },
      { name: "Sep", value: 13 },
      { name: "Oct", value: 11 },
    ],
    Beverages: [
      { name: "Jun", value: 7 },
      { name: "Jul", value: 9 },
      { name: "Aug", value: 8 },
      { name: "Sep", value: 6 },
      { name: "Oct", value: 5 },
    ],
    Dairy: [
      { name: "Jun", value: 10 },
      { name: "Jul", value: 14 },
      { name: "Aug", value: 9 },
      { name: "Sep", value: 7 },
      { name: "Oct", value: 6 },
    ],
  };

  // combine data based on category filter
  const combinedData =
    category === "All"
      ? data.Bakery.map((_, i) => ({
          name: data.Bakery[i].name,
          Bakery: data.Bakery[i].value,
          Beverages: data.Beverages[i].value,
          Dairy: data.Dairy[i].value,
        }))
      : data[category].map((item) => ({
          name: item.name,
          [category]: item.value,
        }));

  const totalWastage =
    category === "All"
      ? Object.values(data)
          .flat()
          .reduce((sum, item) => sum + item.value, 0)
      : data[category].reduce((sum, item) => sum + item.value, 0);

  const handleExportCSV = () => {
    const headers = "Month,Category,Value\n";
    let csv = headers;
    const filtered = category === "All" ? Object.keys(data) : [category];
    filtered.forEach((cat) => {
      data[cat].forEach((item) => {
        csv += `${item.name},${cat},${item.value}\n`;
      });
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.csv";
    link.click();
  };

  const handleExportPDF = () => {
    alert("PDF export coming soon 🚀 (CSV works now!)");
  };

  const handleApplySuggestion = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  return (
   
      <div style={{backgroundColor:"white",height:"100vh",width:"85vw",overflowY:"auto"}}>
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
      <h2 style={heading}>Reports & Analytics</h2>
      <p style={subText}>
        Interactive dashboard to track product wastage and trends.
      </p>

      {/* Filters */}
      <div style={filterRow}>
        <label style={{fontSize:"20px",fontWeight:"bold"}}>Report Type:</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          style={selectStyle}
        >
          <option value="Wastage">Wastage Report</option>
          <option value="Sales">Sales Report</option>
        </select>
        <label style={{fontSize:"20px",fontWeight:"bold"}}>Time Range:</label>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          style={selectStyle}
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 3 Months</option>
        </select>
        <label style={{fontSize:"20px",fontWeight:"bold"}}>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={selectStyle}
        >
          <option value="All">All Categories</option>
          <option value="Bakery">Bakery</option>
          <option value="Beverages">Beverages</option>
          <option value="Dairy">Dairy</option>
        </select>

        <div style={{ display: "flex", gap: "8px" }}>
          <button style={exportBtn("#22c55e", "#fff")} onClick={handleExportCSV}>
            Export CSV
          </button>
          <button style={exportBtn("#000", "#fff")} onClick={handleExportPDF}>
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary */}
      <div style={summaryRow}>
        {summaryCard(
          "Total Wastage",
          `${totalWastage} items`,
          "Filtered total",
          "#ef4444"
        )}
        {summaryCard("Wastage Value", `$${totalWastage * 15}`, "Approx loss", "#f97316")}
        {summaryCard("Sales Rate", `${Math.max(90 - totalWastage / 10, 60)}%`, "Before expiry", "#22c55e")}
      </div>

      {/* Chart */}
      <div style={chartBox}>
        <h4 style={chartTitleStyle}>Monthly {reportType} Trends</h4>
        <ResponsiveContainer width="100%" height={250}>
          {reportType === "Wastage" ? (
            <BarChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {category === "All" && <Bar dataKey="Bakery" fill="#f59e0b" />}
              {category === "All" && <Bar dataKey="Beverages" fill="#3b82f6" />}
              {category === "All" && <Bar dataKey="Dairy" fill="#22c55e" />}
              {category !== "All" && (
                <Bar dataKey={category} fill="#ef4444" />
              )}
            </BarChart>
          ) : (
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {category === "All" && <Line type="monotone" dataKey="Bakery" stroke="#f59e0b" />}
              {category === "All" && <Line type="monotone" dataKey="Beverages" stroke="#3b82f6" />}
              {category === "All" && <Line type="monotone" dataKey="Dairy" stroke="#22c55e" />}
              {category !== "All" && <Line type="monotone" dataKey={category} stroke="#ef4444" />}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Smart Suggestions */}
      <div style={sectionBox}>
        <h4 style={chartTitleStyle}>Smart Suggestions</h4>
        {suggestion(
          "Offer 20% off Bakery items expiring soon",
          "Reduce wastage by ~15%",
          () => handleApplySuggestion("✅ Discount applied successfully!")
        )}
        {suggestion(
          "Restock Greek Yogurt - high demand, low waste",
          "Potential +$450/week",
          () => handleApplySuggestion("✅ Restock scheduled!")
        )}
      </div>

      {toast && (
        <div style={toastStyle}>
          {toast}
        </div>
      )}
      </div>
   
  );
}

/* Styles */

const heading = { fontSize: "20px", fontWeight: "600", marginBottom: "4px" };
const subText = { color: "#6b7280", marginBottom: "16px" };
const filterRow = { display: "flex", gap: "1%", marginBottom: "12px",justifyContent:"space-between"  };
const selectStyle = {
  padding: "8px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  backgroundColor: "#fff",
  fontSize: "14px",
};
const exportBtn = (bg, color) => ({
  backgroundColor: bg,
  color,
  border: "none",
  borderRadius: "6px",
  padding: "8px 14px",
  cursor: "pointer",
});
const summaryRow = { display: "flex", gap: "1%", flexWrap: "wrap",maxHeight:"65%", };
const summaryCard = (title, value, subtitle, borderColor) => (
  <div
    style={{
      flex: "1",
      maxWidth: "40%",
      
      backgroundColor: "#fff",
      border: `2px solid ${borderColor}`,
      borderRadius: "10px",
      padding: "10px",
    }}
  >
    <p style={{ fontWeight: "600" }}>{title}</p>
    <h3 style={{ fontSize: "22px", fontWeight: "700" }}>{value}</h3>
    <p style={{ color: "#6b7280", fontSize: "13px" }}>{subtitle}</p>
  </div>
);
const chartBox = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  padding: "16px",
  marginTop: "16px",
};
const chartTitleStyle = { fontWeight: "600", marginBottom: "8px" };
const sectionBox = {
  backgroundColor: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "16px",
  marginTop: "16px",
};
const suggestion = (text, sub, onApply) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#f9fafb",
      padding: "12px 16px",
      borderRadius: "8px",
      marginTop: "8px",
    }}
  >
    <div>
      <p style={{ fontWeight: "600" }}>{text}</p>
      <p style={{ color: "#10b981", fontSize: "13px" }}>{sub}</p>
    </div>
    <button
      onClick={onApply}
      style={{
        backgroundColor: "#fff",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        padding: "6px 14px",
        cursor: "pointer",
      }}
    >
      Apply
    </button>
  </div>
);
const toastStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#22c55e",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "8px",
  fontWeight: "600",
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
};