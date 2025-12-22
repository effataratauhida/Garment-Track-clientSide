import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetch(
      `https://garment-track-server-zeta.vercel.app/orders${statusFilter ? `?status=${statusFilter}` : ""}`,
      { credentials: "include" }
    )
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => toast.error("Failed to load orders"));
  }, [statusFilter]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">All Orders</h2>

      {/* Filter */}
      <div className="mb-4">
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
      <table className="table w-full min-w-[900px]">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id.slice(-6)}</td>
              <td>{order.email}</td>
              <td>{order.productTitle}</td>
              <td>{order.quantity}</td>
              <td>
                <span className="badge badge-outline">
                  {order.status}
                </span>
              </td>
              <td>
                <Link
                  to={`/dashboard/order/${order._id}`}
                  className="btn btn-sm bg-orange-500 text-white"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AllOrders;
