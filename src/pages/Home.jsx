// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// static examples for visual demo
const SAMPLE_PROJECTS = [
  {
    id: "p1",
    title: "E-Commerce Website",
    desc: "Fullstack e-commerce with React front-end and .NET backend.",
    tags: ["React", ".NET", "Payments"],
  },
  {
    id: "p2",
    title: "Mobile Banking App",
    desc: "Secure mobile payments and account management.",
    tags: ["React Native", "Security"],
  },
  {
    id: "p3",
    title: "Marketing Site Redesign",
    desc: "Performance and accessibility focused redesign.",
    tags: ["UX", "SEO"],
  },
];

const FEATURES = [
  { title: "Project Management", desc: "Create, plan and track projects with milestones." },
  { title: "Task Board (Kanban)", desc: "Drag & drop tasks across workflow columns." },
  { title: "Comments & Files", desc: "Collaborate on tasks with threaded comments and attachments." },
  { title: "Gantt & Insights", desc: "Visual timelines and activity logs for stakeholders." },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "PM", quote: "This saved our team hours every week — clear and simple." },
  { name: "Aarav Mehta", role: "Dev", quote: "Nice UX and the Kanban board is super-smooth." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbfdff] to-[#f3f7f9]">
      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              Build better products with a simple project & task system
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">
              Plan work, collaborate with your team, track progress and ship features — all in one place.
              Designed for teams who want speed without sacrificing structure.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 rounded-md bg-black text-white font-medium shadow"
              >
                Get started — it's free
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 rounded-md border border-black bg-white text-black font-medium"
              >
                Learn more
              </Link>
            </div>

            {/* trust badges */}
            <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">★</div>
                <span>Trusted by teams at 100+ companies</span>
              </div>
            </div>
          </div>

          {/* graphic / hero card */}
          <div className="relative">
            <div className="hidden lg:block absolute -right-16 -top-12 w-[420px] h-[300px] rounded-lg bg-white border-2 border-black shadow-[12px_12px_0_rgba(0,0,0,0.9)] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold">Project Preview</div>
                <div className="text-xs text-gray-400">Status: In Progress</div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium">E-Commerce Website</div>
                <p className="text-xs text-gray-500">Build product pages, checkout, admin panel.</p>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="p-2 bg-gray-50 rounded border text-xs">Tasks 24</div>
                  <div className="p-2 bg-gray-50 rounded border text-xs">Members 6</div>
                  <div className="p-2 bg-gray-50 rounded border text-xs">Due 2026-01-30</div>
                </div>
              </div>
            </div>

            {/* fallback decorative SVG / small card for smaller screens */}
            <div className="lg:hidden p-6 rounded-lg bg-white border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,0.9)]">
              <div className="text-sm font-semibold">Project Preview</div>
              <div className="mt-3 text-sm font-medium">E-Commerce Website</div>
              <p className="mt-1 text-xs text-gray-500">Build product pages, checkout, admin panel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-4">What you get</h2>
        <p className="text-sm text-gray-600 mb-6 max-w-2xl">Everything teams need to plan, execute and ship — with tools that keep work visible and predictable.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="p-5 rounded-lg bg-white border hover:shadow-md transition-shadow">
              <div className="text-lg font-semibold">{f.title}</div>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects showcase */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Customer projects (sample)</h3>
          <Link to="/projects" className="text-sm underline">See all projects</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_PROJECTS.map(p => (
            <div key={p.id} className="p-5 bg-white border rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">{p.title}</div>
                <div className="text-xs text-gray-400">Active</div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{p.desc}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map(t => <span key={t} className="text-xs px-2 py-1 rounded border bg-gray-50">{t}</span>)}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">Members: {Math.floor(Math.random()*8)+2}</div>
                <button className="text-sm px-3 py-1 border rounded">Open</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h3 className="text-xl font-bold mb-4">Loved by teams</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TESTIMONIALS.map(t => (
            <blockquote key={t.name} className="p-6 bg-white border rounded-lg">
              <p className="text-gray-700">“{t.quote}”</p>
              <div className="mt-4 text-sm font-semibold">{t.name} <span className="text-xs text-gray-400">• {t.role}</span></div>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="p-8 rounded-lg bg-gradient-to-r from-white to-gray-50 border shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold">Ready to get organized?</h4>
            <p className="text-sm text-gray-600 mt-1">Start a project, add your team and track progress — fast.</p>
          </div>

          <div className="flex gap-3">
            <Link to="/register" className="px-5 py-3 rounded bg-black text-white font-medium">Create account</Link>
            <Link to="/projects" className="px-5 py-3 rounded border">Browse projects</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md border-2 border-black bg-white flex items-center justify-center">PT</div>
              <div>
                <div className="font-bold">Project & Task</div>
                <div className="text-xs text-gray-500">Plan — Collaborate — Deliver</div>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500 max-w-sm">A simple, powerful project & task tool for teams that want to stay focused and ship more often.</p>
          </div>

          <div className="flex gap-8">
            <div>
              <div className="font-semibold">Product</div>
              <ul className="mt-2 text-sm text-gray-600">
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/tasks">Tasks</Link></li>
                <li><Link to="/board">Board</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold">Company</div>
              <ul className="mt-2 text-sm text-gray-600">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contactus">Contact</Link></li>
                <li><Link to="/register">Careers</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} Project & Task — All rights reserved.</div>
      </footer>
    </div>
  );
}
