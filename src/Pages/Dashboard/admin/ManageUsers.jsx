import { useEffect, useState } from "react";
import UpdateUserModal from "./UpdateUserModal";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
       
        const filtered = data.filter(u => u.role !== "admin");
        setUsers(filtered);
      });
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center md:text-4xl font-extrabold pb-5
          bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] bg-clip-text text-transparent">Manage Users</h2>
      
      <div className="overflow-x-auto">
      <table className="table w-full bg-gray-100 min-w-[900px]">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span className={`badge ${
                  user.status === "suspended" ? "badge-error" : "badge-success"
                }`}>
                  {user.status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => openModal(user)}
                  className="btn btn-sm border-2 bg-orange-500 text-white"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {showModal && (
        <UpdateUserModal
          user={selectedUser}
          setShowModal={setShowModal}
          setUsers={setUsers}
        />
      )}
    </div>
  );
};

export default ManageUsers;
