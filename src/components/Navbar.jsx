// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onOpenCreate }) {
  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-md border-2 border-black shadow-[6px_6px_0_rgba(0,0,0,0.9)] bg-white">
              <span className="font-bold">PT</span>
            </div>
            {/* <Link to="/" className="text-lg font-bold">Project & Task</Link> */}
          </div>

          <nav className="flex items-center gap-6">
            {/* <Link to="/" className="text-sm hover:underline">Home</Link>
            <Link to="/about" className="text-sm hover:underline">About</Link>
            <Link to="/projects" className="text-sm hover:underline">Projects</Link>
            <Link to="/tasks" className="text-sm hover:underline">Tasks</Link>
            <Link to="/contactus" className="text-sm hover:underline">Contact</Link> */}

            <div className="hidden sm:flex items-center gap-3">
              {/* <Link to="/login" className="text-sm px-3 py-1 border rounded">Log In</Link>
              <Link to="/register" className="text-sm px-3 py-1 border rounded bg-black text-white">Register</Link> */}
            </div>

            <div className="sm:hidden">
              {/* <Link to="/login" className="text-sm px-2 py-1">Sign in</Link> */}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
