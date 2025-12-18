import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
        //console.log("All users:", data);
        //setUsers(data)
        const filteredUsers = data.filter(user => user.role !== "admin");
  setUsers(filteredUsers);
      } );
      //console.log("All users:", data);
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className="badge badge-outline">{user.role}</span>
              </td>
              <td>
                <button
                  onClick={() => openModal(user)}
                  className="btn btn-sm btn-primary"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
