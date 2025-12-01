import React, { useState } from "react";
import ProjectModal from "./ProjectModal";
import TaskModal from "./TaskModal";
import AddEmployeesToProject from "./AddEmployeesToProject"
import TaskComments from "./TaskComments"
import UpdateProjectModal from "./UpdateProjectModal";
import UpdateTaskModal from "./UpdateTaskModal";


export default function ProjectsPage() {
  const [open, setOpen] = useState(false);
  const [project,setProject] = useState( {
    "projectId": 5,
    "fileId": null,
    "projectName": "string",
    "projectDescription": "string",
    "projectStartDate": "2025-12-01T09:29:05.012",
    "projectStatus": 0,
    "projectEndDate": "2025-12-01T09:29:05.012",
    "projectCreatedAt": "2025-12-01T09:29:09.0630536",
    "tasks": [],
    "userProjects": null,
    "file": null
  }
)
const [task,setTask] = useState({ "taskId": 5,
    "projectId": 4,
    "userId": null,
    "fileId": null,
    "taskTitle": "string",
    "taskDescription": "string",
    "taskPriority": 0,
    "taskStatus": 0,
    "taskDueDate": "2025-12-01T12:29:28.998",
    "taskCreatedAt": "2025-12-01T12:28:11.2359146",
    "user": null,
    "project": null,
    "comments": null,
    "file": null
})

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

   const updateProject = async (id, payload) => {
    const res = await fetch(`https://localhost:7228/api/project/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Updated!", data);
  };

  const updateTask = async (id, payload) => {
    const res = await fetch(
      `https://localhost:7228/api/projecttask/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    console.log("Task Updated!", data);
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
        
        {/* <TaskComments isOpen={open} onClose={() => setOpen(false)} currentUserId={1} /> */}

        {/* <UpdateProjectModal
          isOpen={open}
          onClose={() => setOpen(false)}
          project={project}
          onUpdate={updateProject}
        /> */}

         <UpdateTaskModal
            isOpen={open}
            onClose={() => setOpen(false)}
            task={task}
            onUpdate={updateTask}
          />
          
      </div>
    </div>
  );
}
