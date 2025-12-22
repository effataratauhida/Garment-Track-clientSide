import { useState } from "react";
import toast from "react-hot-toast";

const UpdateUserModal = ({ user, setShowModal, setUsers }) => {
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);
  const [suspendReason, setSuspendReason] = useState("");
  const [suspendFeedback, setSuspendFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    // ❗ suspend validation
    if (status === "suspended" && (!suspendReason || !suspendFeedback)) {
      toast.error("Suspend reason & feedback required");
      return;
    }

    setLoading(true);

    const res = await fetch(`https://garment-track-server-zeta.vercel.app/users/${user._id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        status: status || 'approved',
        suspendReason,
        suspendFeedback,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("User updated successfully");

      setUsers(prev =>
        prev.map(u =>
          u._id === user._id
            ? { ...u, role, status }
            : u
        )
      );

      setShowModal(false);
    } else {
      toast.error(data.message || "Update failed");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-bold mb-3">Update User</h3>

        <p className="text-sm mb-3 text-gray-600">{user.email}</p>

        {/* ROLE */}
        <label className="label">Role</label>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="select select-bordered w-full mb-3"
        >
          <option value="buyer">Buyer</option>
          <option value="manager">Manager</option>
        </select>

        {/* STATUS */}
        <label className="label">Status</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="select select-bordered w-full mb-3"
        >
        <option value="pending" disabled>Pending</option>
          <option value="approved">Approved</option>
          <option value="suspended">Suspended</option>
        </select>

        {/* SUSPEND EXTRA */}
        {status === "suspended" && (
          <>
            <input
              type="text"
              placeholder="Suspend Reason"
              className="input input-bordered w-full mb-2"
              value={suspendReason}
              onChange={e => setSuspendReason(e.target.value)}
            />

            <textarea
              placeholder="Suspend Feedback"
              className="textarea textarea-bordered w-full mb-3"
              value={suspendFeedback}
              onChange={e => setSuspendFeedback(e.target.value)}
            />
          </>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="btn btn-sm bg-orange-500 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
