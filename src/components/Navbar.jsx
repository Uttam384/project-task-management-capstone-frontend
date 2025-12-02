// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ compact = false }) {
  return (
    <header className="bg-white sticky top-0 z-40 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md border-2 border-gray-900 bg-white flex items-center justify-center text-lg font-bold shadow-sm">
                PT
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold leading-tight">Project & Task</div>
                <div className="text-xs text-gray-500">Plan • Collaborate • Deliver</div>
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/projects" className="text-sm text-gray-700 hover:text-gray-900">Projects</Link>
            <Link to="/tasks" className="text-sm text-gray-700 hover:text-gray-900">Tasks</Link>
            <Link to="/board" className="text-sm text-gray-700 hover:text-gray-900">Board</Link>
            <Link to="/gantt" className="text-sm text-gray-700 hover:text-gray-900">Gantt</Link>
            <Link to="/about" className="text-sm text-gray-700 hover:text-gray-900">About</Link>
            <Link to="/contactus" className="text-sm text-gray-700 hover:text-gray-900">Contact</Link>
          </nav>

          {/* actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Link to="/login" className="text-sm px-3 py-1 border rounded text-gray-700 hover:bg-gray-50">Log In</Link>
              <Link to="/register" className="ml-3 text-sm px-3 py-1 border rounded bg-gray-900 text-white">Register</Link>
            </div>

            {/* mobile menu trigger (simple) */}
            <div className="md:hidden">
              <Link to="/login" className="text-sm px-2 py-1 text-gray-700">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
