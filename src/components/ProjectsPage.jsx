import React, { useState } from "react";
import ProjectModal from "./ProjectModal";
import TaskModal from "./TaskModal";
import AddEmployeesToProject from "./AddEmployeesToProject"
import TaskComments from "./TaskComments"

export default function ProjectsPage() {
  const [open, setOpen] = useState(false);

  // onCreateProject receives FormData and plain dto (for flexibility)
  const handleCreate = async (formData, dto) => {
    // Example: upload formData to backend
    // Note: adjust endpoint and headers according to your backend expectations
    const res = await fetch("/api/projects", {
      method: "POST",
      body: formData // FormData automatically sets content-type multipart/form-data
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || "Failed to create project");
    }

    const created = await res.json();
    // created should contain projectId and fileId etc
    console.log("Created project", created);
    // update local UI/state as needed
  };

  const createTask = async (dto) => {
    // Example POST JSON:
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto)
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "Failed to create task");
    }
    const created = await res.json();
    console.log("Created task:", created);
    // refresh tasks, etc.
  };

  return (
    <div className="min-h-screen bg-[#f3f7f9] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Projects</h1>
          <button onClick={() => setOpen(true)} className="px-4 py-2 rounded border border-black">
            New Project
          </button>
        </div>

        {/* list of projects... */}

        {/* <TaskModal isOpen={open} onClose={() => setOpen(false)} onCreateTask={createTask} defaultUserId={1} /> */}
        
        {/* {open && <AddEmployeesToProject setOpen={setOpen} />} */}
        
        <TaskComments isOpen={open} onClose={() => setOpen(false)} currentUserId={1} />

      </div>
    </div>
  );
}
