import React, { useState } from 'react'
import SideBar from './SideBar'
import Dashboard from './dashboard/Dashboard';
import ProductsPage from './products-pg/Products';
import Notify from './Notify';
import StoreSettings from './SettingsPage/StoreSettings';
import ReportsPage from './Reports/ReportsPage';

const Dash = () => {

    const [activePage, setActivePage] = useState('Dashboard');
  return (
    <div className='flex h-[100vh] w-[100vw] '>
      <SideBar activePage={activePage} setActivePage={setActivePage} />
      {activePage === 'Dashboard' && <Dashboard setActivePage={setActivePage}/>}
      {activePage === 'Products' && <ProductsPage />}
      {activePage === 'Alerts' && <Notify />}
      {activePage === 'Reports' && <ReportsPage />}
      {activePage === 'Settings' && <StoreSettings />}
      

    </div>
  )
}

export default Dash