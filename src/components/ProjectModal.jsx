// ProjectModal.jsx
import React, { useState, useEffect, useRef } from "react";

export default function ProjectModal({ isOpen, onClose, onCreateProject }) {
  // form state (user asked for form, setForm)
  const [form, setForm] = useState({
    projectName: "",
    projectDescription: "",
    projectStartDate: "",
    projectEndDate: "",
    file: null
  });

  const [errors, setErrors] = useState({});
  const [filePreview, setFilePreview] = useState(null);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    // reset when opening/closing modal
    if (isOpen) {
      setForm({
        projectName: "",
        projectDescription: "",
        projectStartDate: "",
        projectEndDate: "",
        file: null
      });
      setErrors({});
      setFilePreview(null);
    }
  }, [isOpen]);

  // small validation
  const validate = () => {
    const e = {};
    if (!form.projectName.trim()) e.projectName = "Title is required";
    if (!form.projectDescription.trim()) e.projectDescription = "Description is required";
    if (!form.projectStartDate) e.projectStartDate = "Start date is required";
    if (!form.projectEndDate) e.projectEndDate = "End date is required";
    if (form.projectStartDate && form.projectEndDate) {
      if (new Date(form.projectEndDate) < new Date(form.projectStartDate))
        e.projectEndDate = "End date must be after start date";
    }
    // file optional — uncomment if required
    // if (!form.file) e.file = "Please attach a file";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // file change handler
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setForm(prev => ({ ...prev, file: f }));
    setErrors(prev => ({ ...prev, file: undefined }));
    if (f && f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setFilePreview(url);
      // revoke on cleanup
      if (!firstRenderRef.current) {
        return () => URL.revokeObjectURL(url);
      }
    } else {
      setFilePreview(null);
    }
  };

  // controlled inputs using setForm
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // create DTO like backend object (fields named accordingly)
    const dto = {
      // projectId: assigned by backend (not provided here)
      fileId: null, // backend will return fileId after file upload
      projectName: form.projectName,
      projectDescription: form.projectDescription,
      projectStartDate: form.projectStartDate, // ISO date string
      projectEndDate: form.projectEndDate,
      projectCreatedAt: new Date().toISOString()
    };

    // If you need to upload file + json together:
    const payload = new FormData();
    if (form.file) {
      payload.append("file", form.file);
    }
    // include JSON DTO (server should parse it accordingly)
    payload.append("project", JSON.stringify(dto));

    // Example: call parent's onCreateProject to actually POST
    // Parent can do fetch('/api/projects', { method: 'POST', body: payload })
    if (onCreateProject) {
      try {
        await onCreateProject(payload, dto); // parent handles network
        onClose();
      } catch (err) {
        // show server error as needed
        console.error("Create project failed", err);
        setErrors(prev => ({ ...prev, server: err.message || "Create failed" }));
      }
    } else {
      console.log("Prepared payload", { dto, formFile: form.file });
      alert("Demo: check console for prepared DTO and FormData.");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div
        className="relative bg-white rounded-lg border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,0.9)] w-full max-w-xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold">Create Project</h2>
            <p className="text-sm text-gray-500">Add a new project to the workspace</p>
          </div>
          <button
            onClick={onClose}
            className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6">
          {/* Title */}
          <label className="block mb-3">
            <span className="text-sm font-medium">Title</span>
            <input
              name="projectName"
              value={form.projectName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${
                errors.projectName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="E-Commerce Website"
            />
            {errors.projectName && <p className="text-xs text-red-600 mt-1">{errors.projectName}</p>}
          </label>

          {/* Description */}
          <label className="block mb-3">
            <span className="text-sm font-medium">Description</span>
            <input
              name="projectDescription"
              value={form.projectDescription}
              onChange={handleChange}
              rows={4}
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${
                errors.projectDescription ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Build a modern e-commerce platform with React and .NET"
            />
            {errors.projectDescription && <p className="text-xs text-red-600 mt-1">{errors.projectDescription}</p>}
          </label>

          <div className="grid grid-cols-2 gap-4 mb-3">
            {/* Start Date */}
            <label className="block">
              <span className="text-sm font-medium">Start date</span>
              <input
                type="date"
                name="projectStartDate"
                value={form.projectStartDate}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${
                  errors.projectStartDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.projectStartDate && <p className="text-xs text-red-600 mt-1">{errors.projectStartDate}</p>}
            </label>

            {/* End Date */}
            <label className="block">
              <span className="text-sm font-medium">End date</span>
              <input
                type="date"
                name="projectEndDate"
                value={form.projectEndDate}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${
                  errors.projectEndDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.projectEndDate && <p className="text-xs text-red-600 mt-1">{errors.projectEndDate}</p>}
            </label>
          </div>

          {/* File */}
          <label className="block mb-4">
            <span className="text-sm font-medium">Attachment (optional)</span>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
            {errors.file && <p className="text-xs text-red-600 mt-1">{errors.file}</p>}

            {filePreview && (
              <div className="mt-3">
                <img src={filePreview} alt="preview" className="max-h-40 rounded border" />
              </div>
            )}
          </label>

          {/* Server error */}
          {errors.server && <p className="text-sm text-red-600 mb-3">{errors.server}</p>}

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <button
                type="submit"
                style={{cursor:'pointer'}} 
                className="px-6 py-2 rounded-md bg-black text-white font-medium shadow-sm"
              >
                Create
              </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-3 px-4 py-2 rounded-md border border-gray-300"
              >
                Cancel
              </button>
            </div>

            <div className="text-sm text-gray-500">{/* optional helper text */}</div>
          </div>
        </form>
      </div>
    </div>
  );
}
