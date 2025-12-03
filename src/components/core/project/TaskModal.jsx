// TaskModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { getAllUser } from '../../../services/operations/authAPI';
import { X } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onCreateTask, projectId, availableUsers = [] }) {
  const [form, setForm] = useState({
    projectId:projectId,
    taskTitle: "",
    taskDescription: "",
    taskPriority: 1, // 0=Low, 1=Medium, 2=High
    taskDueDate: "",
    assignedUser: null,
    file: null
  });

  const [errors, setErrors] = useState({});
  const [userInput, setUserInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const firstRenderRef = useRef(true);
  const searchTimeout = useRef(null);
  const { token } = useSelector((state) => state.auth || {});

  useEffect(() => {
    // reset when opening/closing modal
    if (isOpen) {
      setForm({
        taskTitle: "",
        taskDescription: "",
        taskPriority: 1,
        taskDueDate: "",
        assignedUser: null,
        file: null
      });
      setErrors({});
      setUserInput("");
      setFilteredUsers([]);
    }
  }, [isOpen]);

  // small validation
  const validate = () => {
    const e = {};
    if (!form.taskTitle.trim()) e.taskTitle = "Task title is required";
    if (!form.taskDescription.trim()) e.taskDescription = "Task description is required";
    if (!form.taskDueDate) e.taskDueDate = "Due date is required";
    if (!form.assignedUser) e.assignedUser = "A user must be assigned";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // controlled inputs using setForm
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  // Handle user search and filter
  const handleUserInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    
    // debounce search to avoid too many requests
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      if (!value.trim()) {
        setFilteredUsers([]);
        return;
      }

      const q = value.toLowerCase();

      // first filter project-available users
      const localMatches = (availableUsers || []).filter(user =>
        (!form.assignedUser || form.assignedUser.userId !== user.userId) &&
        (user.userName?.toLowerCase().includes(q) || user.userEmail?.toLowerCase().includes(q))
      );

      // fetch global users and merge
      try {
        const resp = await getAllUser({ token })();
        const all = Array.isArray(resp) ? resp : [];
        // normalize and filter
        const normalized = all.map(u => ({ userId: u.userId ?? u.id ?? u.userId, userName: u.userName ?? u.userName ?? (u.firstName ? `${u.firstName} ${u.lastName ?? ''}`.trim() : ''), userEmail: u.userEmail ?? u.email }))
          .filter(u => (u.userName && u.userName.toLowerCase().includes(q)) || (u.userEmail && u.userEmail.toLowerCase().includes(q)));

        // merge unique by userId, prefer localMatches first
        const mergedMap = new Map();
        localMatches.forEach(u => mergedMap.set(String(u.userId), u));
        normalized.forEach(u => {
          if (!mergedMap.has(String(u.userId))) mergedMap.set(String(u.userId), u);
        });

        const merged = Array.from(mergedMap.values());
        setFilteredUsers(merged.slice(0, 50));
      } catch (err) {
        console.error('Failed to fetch users for assignment', err);
        setFilteredUsers(localMatches.slice(0, 50));
      }
    }, 300);
  };

  // Add user to assigned users
  const addAssignedUser = (user) => {
    setForm(prev => ({
      ...prev,
      assignedUser: user
    }));
    setUserInput("");
    setFilteredUsers([]);
  };

  // Remove user from assigned users
  const removeAssignedUser = () => {
    setForm(prev => ({
      ...prev,
      assignedUser: null
    }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setForm(prev => ({ ...prev, file: f }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // create DTO for task
    const dto = {
      projectId,
      taskTitle: form.taskTitle,
      taskDescription: form.taskDescription,
      taskPriority: Number(form.taskPriority),
      taskDueDate: form.taskDueDate,
      assignedUsers: form.assignedUser ? [form.assignedUser.userId] : []
    };

    // If file is provided, send as FormData with 'task' JSON
    const payload = new FormData();
    if (form.file) {
      // include projectId as a top-level field for backend convenience
      payload.append('projectId', projectId);
      payload.append('file', form.file);
      payload.append('task', JSON.stringify(dto));
    }

    try {
      if (onCreateTask) {
        if (form.file) {
          await onCreateTask(payload);
        } else {
          await onCreateTask(dto);
        }
        if (onClose) onClose();
      } else {
        console.log("Prepared task payload", form.file ? payload : dto);
        alert("Demo: check console for prepared DTO.");
        if (onClose) onClose();
      }
    } catch (err) {
      console.error("Create task failed", err);
      setErrors(prev => ({ ...prev, server: err.message || "Create failed" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className="relative bg-white rounded-lg border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,0.9)] w-full max-w-xl max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 sticky top-0 bg-white border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold">Create Task</h2>
            <p className="text-sm text-gray-500">Add a new task to the project</p>
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
          {/* Task Title */}
          <label className="block mb-3">
            <span className="text-sm font-medium">Task Title</span>
            <input
              name="taskTitle"
              value={form.taskTitle}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${
                errors.taskTitle ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Implement user authentication"
            />
            {errors.taskTitle && <p className="text-xs text-red-600 mt-1">{errors.taskTitle}</p>}
          </label>

          {/* Task Description */}
          <label className="block mb-3">
            <span className="text-sm font-medium">Description</span>
            <textarea
              name="taskDescription"
              value={form.taskDescription}
              onChange={handleChange}
              rows={4}
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${
                errors.taskDescription ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe the task in detail..."
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
              >
                <option value={0}>Low</option>
                <option value={1}>Medium</option>
                <option value={2}>High</option>
              </select>
              {errors.taskPriority && <p className="text-xs text-red-600 mt-1">{errors.taskPriority}</p>}
            </label>

            {/* Due Date */}
            <label className="block">
              <span className="text-sm font-medium">Due date</span>
              <input
                type="date"
                name="taskDueDate"
                value={form.taskDueDate}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${
                  errors.taskDueDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.taskDueDate && <p className="text-xs text-red-600 mt-1">{errors.taskDueDate}</p>}
            </label>
          </div>

          {/* Assigned Users */}
          <label className="block mb-4">
            <span className="text-sm font-medium">Assign to User</span>
            <div className="relative mt-1">
              <input
                type="text"
                value={userInput}
                onChange={handleUserInputChange}
                placeholder={form.assignedUser ? "User assigned — remove to change" : "Search and assign a user..."}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                disabled={!!form.assignedUser}
              />
              {filteredUsers.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                  {filteredUsers.map(user => (
                    <div
                      key={user.userId}
                      onClick={() => addAssignedUser(user)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      <div className="font-medium text-gray-800">{user.userName}</div>
                      <div className="text-xs text-gray-500">{user.userEmail}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Selected Assigned Users */}
            {form.assignedUser && (
              <div className="mt-3">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-flex items-center gap-2">
                  <span>{form.assignedUser.userName}</span>
                  <button
                    type="button"
                    onClick={() => removeAssignedUser()}
                    className="hover:text-blue-900 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Only one user can be assigned to a task. Remove selected user to change assignment.</p>
              </div>
            )}
            {errors.assignedUser && <p className="text-xs text-red-600 mt-2">{errors.assignedUser}</p>}
          </label>

            {/* File Upload */}
            <label className="block mb-4">
              <span className="text-sm font-medium">Attach File (optional)</span>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
              />
              {form.file && <p className="text-xs text-gray-600 mt-2">Selected: {form.file.name}</p>}
            </label>

          {/* Server error */}
          {errors.server && <p className="text-sm text-red-600 mb-3">{errors.server}</p>}

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <button
                type="submit"
                style={{ cursor: 'pointer' }}
                className="px-6 py-2 rounded-md bg-black text-white font-medium shadow-sm hover:bg-gray-800"
              >
                Create Task
              </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-3 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
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
