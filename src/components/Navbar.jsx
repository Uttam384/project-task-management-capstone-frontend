import React from 'react'
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react';

const Navbar = () => {
  return (
    <div className='fixed top-0 w-full z-50 h-20 bg-white border-b-2 border-[#988686] flex items-center justify-between px-10'>
      <div className='text-4xl font-bold flex items-center gap-1'><Clock size={36} strokeWidth={3} /> Skedulo</div>
      <div>
        <Link to="/" className='mx-4 text-lg font-medium'>Home</Link>
        <Link to="/about" className='mx-4 text-lg font-medium'>About</Link>
        <Link to="/contact-us" className='mx-4 text-lg font-medium'>Contact Us</Link>
        <Link to="/login" className={`mx-4 text-lg font-medium p-2 border rounded-lg hover:bg-black hover:border-gray-400 hover:text-white`}>Log In</Link>
        <Link to="/register" className='mx-4 text-lg font-medium p-2 border rounded-lg hover:bg-black hover:border-gray-400 hover:text-white'>Register</Link>
      </div>
    </div>
  )
}

export default Navbar