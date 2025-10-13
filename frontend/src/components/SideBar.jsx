import React, { useState } from 'react';
import { ShoppingCart, LayoutGrid, Box, Bell, FileText, Settings, LogOut } from 'lucide-react';

// Simplified utility for proportional sizing
const vw = (value) => `${value}vw`;
const vh = (value) => `${value}vh`;

const SideBar = ({ setActivePage }) => {
   // default active

  const navItems = [
    { name: 'Dashboard', icon: LayoutGrid },
    { name: 'Products', icon: Box },
    { name: 'Alerts', icon: Bell },
    { name: 'Reports', icon: FileText },
    { name: 'Settings', icon: Settings },
  ];

  // 🔹 Inner NavItem component (merged here)
  const NavItem = ({ name, Icon }) => {
    // const isActive = activeItem === name;
    // const activeClass = isActive
    //   ? 'bg-green-50 text-green-700 font-bold border-l-4 border-green-500'
    //   : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium';

    return (
      <div
        onClick={() => {
   
          setActivePage(name);
        }}
        className={`flex items-center cursor-pointer transition-all text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium`}
        style={{
          padding: `${vh(1.8)} ${vw(1.5)}`,
          fontSize: vw(1.1),
          borderRadius: `0 ${vw(0.3)} ${vw(0.3)} 0` ,
          marginBottom: vh(0.5),
        }}
      >
        <Icon style={{ width: vw(1.5), height: vh(2.8), marginRight: vw(0.8) }} />
        <span>{name}</span>
      </div>
    );
  };

  return (
    <div
      className="bg-white max-h-screen shadow-xl flex flex-col justify-between"
      style={{ width: '15vw' }}
    >
      {/* 🔹 Top Section */}
      <div>
        <div
          className="flex items-center border-b border-gray-100"
          style={{ padding: `${vh(3)} ${vw(1.5)}`, marginBottom: vh(2) }}
        >
          <ShoppingCart
            className="text-green-600"
            style={{ width: vw(2), height: vh(3.5), marginRight: vw(0.5) }}
          />
          <div>
            <h1
              className="font-extrabold text-gray-900"
              style={{ fontSize: vw(1.5), lineHeight: 1.1 }}
            >
              E-Mart
            </h1>
            <p
              className="text-gray-500 font-medium"
              style={{ fontSize: vw(0.9) }}
            >
              Expiry Manager
            </p>
          </div>
        </div>

        {/* 🔹 Navigation Links */}
        <nav>
          {navItems.map((item) => (
            <NavItem key={item.name} name={item.name} Icon={item.icon} />
          ))}
        </nav>
      </div>

      {/* 🔹 Bottom Logout Section */}
      <div
        className="border-t border-gray-100"
        style={{ padding: `${vh(2)} ${vw(1.5)}` }}
      >
        <div
          className="flex items-center cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
          style={{
            padding: `${vh(1)} 0`,
            fontSize: vw(1.1),
          }}
        >
          <LogOut
            style={{ width: vw(1.5), height: vh(2.8), marginRight: vw(0.8) }}
          />
          <span className="font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
