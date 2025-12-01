import React, { useEffect, useState } from "react";

export default function AddEmployeesToProject({ setOpen, projectId }) {
  // Dummy users for frontend testing
  const dummyUsers = [
    { userId: 1, userName: "John Doe", userEmail: "john@example.com" },
    { userId: 2, userName: "Priya Sharma", userEmail: "priya@example.com" },
    { userId: 3, userName: "Aarav Mehta", userEmail: "aarav@example.com" },
    { userId: 4, userName: "Maria Lopez", userEmail: "maria@example.com" },
    { userId: 5, userName: "Chen Wei", userEmail: "chen@example.com" },
    { userId: 6, userName: "Fatima Noor", userEmail: "fatima@example.com" },
    { userId: 7, userName: "Alex Carter", userEmail: "alex@example.com" },
    { userId: 8, userName: "Suresh Patel", userEmail: "suresh@example.com" },
    { userId: 9, userName: "Riya Kulkarni", userEmail: "riya@example.com" },
    { userId: 10, userName: "Michael Owen", userEmail: "michael@example.com" },
  ];

  const [users, setUsers] = useState([]);
  const [projectUsers, setProjectUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Simulate fetching user list from backend
    setUsers(dummyUsers);

    /*
    // 🔹 FUTURE REAL BACKEND CALL
    fetch(`/api/users/get-all`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
    */

    /*
    // 🔹 FUTURE CALL: Fetch users already assigned to project
    fetch(`/api/projects/${projectId}/users`)
      .then((res) => res.json())
      .then((data) => setProjectUsers(data))
      .catch((err) => console.log(err));
    */
  }, []);

  // Handle add user
  const handleAddUser = () => {
    if (!selectedUser) return;

    const user = users.find((u) => u.userId === parseInt(selectedUser));

    const exists = projectUsers.some((u) => u.userId === user.userId);
    if (exists) {
      setMessage("User already added to this project.");
      return;
    }

    setProjectUsers([...projectUsers, user]);
    setMessage("User added successfully!");
    setSelectedUser("");

    /*
    // 🔹 FUTURE BACKEND POST CALL
    fetch(`/api/projects/add-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: projectId,
        userId: user.userId
      })
    })
      .then(res => res.json())
      .then(data => setMessage("User added successfully!"))
      .catch(err => console.log(err));
    */
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg relative">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
      >
        ✕
      </button>

      <h2 className="text-2xl font-semibold mb-4">Add Employees to Project</h2>

      {/* Dropdown + Add Button */}
      <div className="flex gap-3 items-center mb-6">
        <div className="w-full relative">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
            size={1}
            style={{
              overflowY: "auto",
              maxHeight: "150px",
            }}
          >
            <option value="">Select user to add</option>

            {users.map((u) => (
              <option key={u.userId} value={u.userId}>
                {u.userName} ({u.userEmail})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {message && (
        <p className="mb-4 text-green-700 text-sm">{message}</p>
      )}

      {/* List of Users Added */}
      <div>
        <h3 className="text-xl font-medium mb-3">Users In This Project</h3>

        {projectUsers.length === 0 ? (
          <p className="text-gray-600">No users added yet.</p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto border rounded p-2">
            {projectUsers.map((u) => (
              <li
                key={u.userId}
                className="p-3 bg-gray-50 border rounded flex justify-between"
              >
                <span>{u.userName} ({u.userEmail})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
