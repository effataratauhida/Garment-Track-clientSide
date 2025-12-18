import React, { useState } from "react";

const UpdateUserModal = ({ user, setShowModal, setUsers }) => {
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status || "active");

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:5000/users/${user._id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role, status }),
    });

    const data = await res.json();

    if (res.ok) {
      setUsers(prev =>
        prev.map(u => (u._id === user._id ? { ...u, role, status } : u))
      );
      setShowModal(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-xl font-bold mb-4">Update User</h3>

        <p className="mb-2">{user.email}</p>

        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="select select-bordered w-full mb-3"
        >
          <option value="buyer">Buyer</option>
          <option value="manager">Manager</option>
        </select>

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="select select-bordered w-full mb-4"
        >
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="btn btn-sm btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
