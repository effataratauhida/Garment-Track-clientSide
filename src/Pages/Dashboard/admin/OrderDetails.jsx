import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/orders/${id}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setOrder(data));
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <p><b>Order ID:</b> {order._id}</p>
      <p><b>User:</b> {order.userEmail}</p>
      <p><b>Product:</b> {order.productName}</p>
      <p><b>Quantity:</b> {order.quantity}</p>
      <p><b>Status:</b> {order.status}</p>

      <h3 className="text-xl mt-4 font-semibold">Tracking History</h3>
      <ul className="list-disc ml-6">
        {order.tracking?.map((t, i) => (
          <li key={i}>
            {t.date} — {t.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
