import React from 'react'
import Sidebar from '../components/core/dashboard/Sidebar'
import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='w-screen min-h-[calc(100vh-80px)] bg-linear-to-br from-slate-50 to-slate-100'>
      <Sidebar/>
      <div className='w-[calc(100vw-250px)] h-full'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard