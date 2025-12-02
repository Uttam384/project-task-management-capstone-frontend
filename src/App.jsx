// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProjectsPage from "./components/ProjectsPage";

/*
  Placeholder pages for routes referenced by Navbar and Home.
  Replace these with actual page components when you implement them.
*/
const Projects = () => <div className="min-h-screen p-8">Projects page (to be implemented)</div>;
const Tasks = () => <div className="min-h-screen p-8">Tasks page (to be implemented)</div>;
const Board = () => <div className="min-h-screen p-8">Kanban Board (to be implemented)</div>;
const Gantt = () => <div className="min-h-screen p-8">Gantt Chart (to be implemented)</div>;
const About = () => <div className="min-h-screen p-8">About page</div>;
const Contact = () => <div className="min-h-screen p-8">Contact page</div>;
const Login = () => <div className="min-h-screen p-8">Login page</div>;
const Register = () => <div className="min-h-screen p-8">Register page</div>;
const ProjectDetails = ({ id }) => <div className="min-h-screen p-8">Project details (to be implemented)</div>;

function App() {
  return (
    <ProjectsPage />
    // <BrowserRouter>
    //   {/* Navbar is included in pages (Home already renders Navbar). If you prefer a global Navbar, uncomment below and remove Navbar from Home */}
    //   {/* <Navbar /> */}

    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/projects" element={<Projects />} />
    //     <Route path="/projects/:id" element={<ProjectDetails />} />
    //     <Route path="/tasks" element={<Tasks />} />
    //     <Route path="/board" element={<Board />} />
    //     <Route path="/gantt" element={<Gantt />} />
    //     <Route path="/about" element={<About />} />
    //     <Route path="/contactus" element={<Contact />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />

    //     {/* Fallback */}
    //     <Route path="*" element={<div className="min-h-screen p-8">Page not found</div>} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
