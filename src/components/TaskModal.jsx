// TaskModal.jsx
import React, { useEffect } from "react";

/**
 * Props:
 * - isOpen: boolean
 * - onClose: fn
 * - onCreateTask: async fn(dto)  => parent handles POST
 * - defaultUserId: optional number (to prefill userId)
 * - priorityOptions, statusOptions: optional arrays of { value, label } to match backend enums
 */
export default function TaskModal({
  isOpen,
  onClose,
  onCreateTask,
  defaultUserId = null,
  priorityOptions,
  statusOptions
}) {
  const priorities = priorityOptions ?? [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" }
  ];

  const statuses = statusOptions ?? [
    { value: "Pending", label: "Pending" },
    { value: "InProgress", label: "In Progress" },
    { value: "Done", label: "Done" }
  ];

  const [form, setForm] = React.useState({
    userId: defaultUserId ?? "",
    taskTitle: "",
    taskDescription: "",
    taskPriority: priorities[1].value,
    taskStatus: statuses[0].value,
    taskDueDate: ""
  });

  const [errors, setErrors] = React.useState({});
  useEffect(() => {
    if (isOpen) {
      setForm({
        userId: defaultUserId ?? "",
        taskTitle: "",
        taskDescription: "",
        taskPriority: priorities[1].value,
        taskStatus: statuses[0].value,
        taskDueDate: ""
      });
      setErrors({});
    }
  }, [isOpen, defaultUserId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.userId && form.userId !== 0) e.userId = "User is required";
    if (!form.taskTitle || !form.taskTitle.trim()) e.taskTitle = "Title is required";
    if (!form.taskDescription || !form.taskDescription.trim()) e.taskDescription = "Description is required";
    if (!form.taskPriority) e.taskPriority = "Priority is required";
    if (!form.taskStatus) e.taskStatus = "Status is required";
    if (!form.taskDueDate) e.taskDueDate = "Due date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Build DTO exactly as backend expects
    const dto = {
      userId: Number(form.userId),
      taskTitle: form.taskTitle,
      taskDescription: form.taskDescription,
      taskPriority: form.taskPriority,
      taskStatus: form.taskStatus,
      taskDueDate: form.taskDueDate // ISO yyyy-mm-dd (server should parse)
    };

    try {
      if (onCreateTask) {
        await onCreateTask(dto);
      } else {
        console.log("Prepared CreateTask DTO:", dto);
        alert("Demo: check console for task DTO");
      }
      onClose();
    } catch (err) {
      setErrors(prev => ({ ...prev, server: err.message || "Create task failed" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="relative bg-white rounded-lg border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,0.9)] w-full max-w-lg" role="dialog" aria-modal="true">
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold">Create Task</h2>
            <p className="text-sm text-gray-500">Add a task to the project</p>
          </div>
          <button onClick={onClose} className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6">
          {/* UserId (can be hidden or select) */}
          <label className="block mb-3">
            <span className="text-sm font-medium">User ID</span>
            <input
              name="userId"
              value={form.userId}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${errors.userId ? "border-red-500" : "border-gray-300"}`}
              placeholder="123"
            />
            {errors.userId && <p className="text-xs text-red-600 mt-1">{errors.userId}</p>}
          </label>

          {/* Title */}
          <label className="block mb-3">
            <span className="text-sm font-medium">Title</span>
            <input
              name="taskTitle"
              value={form.taskTitle}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${errors.taskTitle ? "border-red-500" : "border-gray-300"}`}
              placeholder="Implement payment flow"
            />
            {errors.taskTitle && <p className="text-xs text-red-600 mt-1">{errors.taskTitle}</p>}
          </label>

          {/* Description */}
          <label className="block mb-3">
            <span className="text-sm font-medium">Description</span>
            <input
              name="taskDescription"
              value={form.taskDescription}
              onChange={handleChange}
              rows={3}
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${errors.taskDescription ? "border-red-500" : "border-gray-300"}`}
              placeholder="Detailed info about what needs to be done..."
            />
            {errors.taskDescription && <p className="text-xs text-red-600 mt-1">{errors.taskDescription}</p>}
          </label>

          <div className="grid grid-cols-2 gap-4 mb-3">
            {/* Priority */}
            <label className="block">
              <span className="text-sm font-medium">Priority</span>
              <select
                name="taskPriority"
                value={form.taskPriority}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${errors.taskPriority ? "border-red-500" : "border-gray-300"}`}
              >
                {priorities.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
              {errors.taskPriority && <p className="text-xs text-red-600 mt-1">{errors.taskPriority}</p>}
            </label>

            {/* Status */}
            <label className="block">
              <span className="text-sm font-medium">Status</span>
              <select
                name="taskStatus"
                value={form.taskStatus}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${errors.taskStatus ? "border-red-500" : "border-gray-300"}`}
              >
                {statuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              {errors.taskStatus && <p className="text-xs text-red-600 mt-1">{errors.taskStatus}</p>}
            </label>
          </div>

          {/* Due date */}
          <label className="block mb-4">
            <span className="text-sm font-medium">Due date</span>
            <input
              type="date"
              name="taskDueDate"
              value={form.taskDueDate}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${errors.taskDueDate ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.taskDueDate && <p className="text-xs text-red-600 mt-1">{errors.taskDueDate}</p>}
          </label>

          {errors.server && <p className="text-sm text-red-600 mb-3">{errors.server}</p>}

          <div className="flex items-center justify-between gap-3">
            <div>
              <button type="submit" style={{cursor:'pointer'}} className="px-6 py-2 rounded-md bg-black text-white font-medium shadow-sm">Create</button>
              <button type="button" onClick={onClose} className="ml-3 px-4 py-2 rounded-md border border-gray-300">Cancel</button>
            </div>
            <div className="text-sm text-gray-500">Ensure due date is accurate.</div>
          </div>
        </form>
      </div>
    </div>
  );
}
