import React, { useState, useEffect } from "react";

const UpdateTaskModal = ({ isOpen, onClose, task, onUpdate }) => {
  const [form, setForm] = useState({
    taskTitle: "",
    taskDescription: "",
    taskPriority: 0,
    taskStatus: 0,
    taskDueDate: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        taskTitle: task.taskTitle || "",
        taskDescription: task.taskDescription || "",
        taskPriority: task.taskPriority ?? 0,
        taskStatus: task.taskStatus ?? 0,
        taskDueDate: task.taskDueDate
          ? task.taskDueDate.split("T")[0]
          : "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      taskTitle: form.taskTitle,
      taskDescription: form.taskDescription,
      taskPriority: Number(form.taskPriority),
      taskStatus: Number(form.taskStatus),
      taskDueDate: form.taskDueDate,
    };

    await onUpdate(task.taskId, payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-3 z-50">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-lg p-6 animate-fadeIn relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Update Task
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✖
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="text-sm text-gray-700">Task Title</label>
            <input
              type="text"
              name="taskTitle"
              required
              value={form.taskTitle}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-700">Task Description</label>
            <textarea
              name="taskDescription"
              required
              value={form.taskDescription}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 h-24 focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-700">Priority</label>
              <select
                name="taskPriority"
                value={form.taskPriority}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-300"
              >
                <option value={0}>Low</option>
                <option value={1}>Medium</option>
                <option value={2}>High</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700">Status</label>
              <select
                name="taskStatus"
                value={form.taskStatus}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-300"
              >
                <option value={0}>To-Do</option>
                <option value={1}>In Progress</option>
                <option value={2}>Completed</option>
              </select>
            </div>

          </div>

          {/* Due Date */}
          <div>
            <label className="text-sm text-gray-700">Due Date</label>
            <input
              type="date"
              name="taskDueDate"
              required
              value={form.taskDueDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-300"
            />
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

export default UpdateTaskModal;
