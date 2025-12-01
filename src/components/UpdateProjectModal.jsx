import React, { useState, useEffect } from "react";

const UpdateProjectModal = ({ isOpen, onClose, project, onUpdate }) => {
  const [form, setForm] = useState({
    projectName: "",
    projectDescription: "",
    projectStartDate: "",
    projectEndDate: "",
  });

  useEffect(() => {
    if (project) {
      setForm({
        projectName: project.projectName || "",
        projectDescription: project.projectDescription || "",
        projectStartDate: project.projectStartDate
          ? project.projectStartDate.split("T")[0]
          : "",
        projectEndDate: project.projectEndDate
          ? project.projectEndDate.split("T")[0]
          : "",
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      projectName: form.projectName,
      projectDescription: form.projectDescription,
      projectStartDate: form.projectStartDate,
      projectEndDate: form.projectEndDate,
    };

    await onUpdate(project.projectId, payload); // API call from parent
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-3 z-50">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-lg p-6 animate-fadeIn relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Update Project
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Project Name */}
          <div>
            <label className="text-sm text-gray-700">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={form.projectName}
              required
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Project Description */}
          <div>
            <label className="text-sm text-gray-700">Project Description</label>
            <textarea
              name="projectDescription"
              value={form.projectDescription}
              required
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 h-24 focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Start Date</label>
              <input
                type="date"
                name="projectStartDate"
                value={form.projectStartDate}
                required
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">End Date</label>
              <input
                type="date"
                name="projectEndDate"
                value={form.projectEndDate}
                required
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-300"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow"
            >
              Update
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default UpdateProjectModal;
