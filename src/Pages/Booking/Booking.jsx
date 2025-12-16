import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // product details
  useEffect(() => {
    fetch(`http://localhost:5000/productsData/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setQuantity(data.minimumOrderQuantity);
      });
  }, [id]);

  //calculate total price
  useEffect(() => {
    if (product) {
      setTotalPrice(quantity * product.price);
    }
  }, [quantity, product]);

  if (!product) return <p className="text-center mt-20">Loading...</p>;

  const handleQuantityChange = (value) => {
    if (value < product.minimumOrderQuantity) {
      toast.error(`Minimum order quantity is ${product.minimumOrderQuantity}`);
      return;
    }
    if (value > product.availableQuantity) {
      toast.error("Quantity exceeds available stock");
      return;
    }
    setQuantity(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const orderData = {
      productId: product._id,
      productTitle: product.name,
      email: user.email,
      price: product.price,
      quantity,
      totalPrice,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      phone: form.phone.value,
      address: form.address.value,
      notes: form.notes.value,
      paymentMethod: product.paymentOptions.join(", "), 
      paymentStatus: product.paymentOptions.includes("Online") ? "pending" : "COD",
      orderStatus: "pending",
      createdAt: new Date(),
    };

    const res = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    toast.success("Order placed successfully!");

    if (product.paymentOptions.includes("Online")) {
      navigate(`/payment/${data.insertedId}`);
    } else {
      navigate("/dashboard/myOrders");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-18 p-6 bg-gray-100 shadow rounded">
      <h2 className="text-2xl md:text-4xl font-extrabold
            text-center mb-5 bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] bg-clip-text text-transparent">
        Order Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* User Email */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">Email</label>
          <input
            value={user.email}
            readOnly
            className="input w-full"
          />
        </div>

        {/* Product Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">Product</label>
          <input
            value={product.name}
            readOnly
            className="input w-full"
          />
        </div>

        {/* Price per product */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">Price per product</label>
          <input
            value={`$${product.price}`}
            readOnly
            className="input w-full"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">Order Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(+e.target.value)}
            className="input w-full"
            min={product.minimumOrderQuantity}
            max={product.availableQuantity}
          />
          <p className="text-sm text-gray-500 mt-1">
            Min: {product.minimumOrderQuantity}, Max: {product.availableQuantity}
          </p>
        </div>

        {/* Total Price */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">Total Price</label>
          <input
            value={`$${totalPrice}`}
            readOnly
            className="input w-full"
          />
        </div>

        {/* Payment Option */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">Payment Option</label>
          <input
            value={product.paymentOptions.join(", ")}
            readOnly
            className="input w-full"
          />
        </div>

        {/* User Details */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">First Name</label>
          <input
            name="firstName"
            placeholder="First Name"
            required
            className="input w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800">Last Name</label>
          <input
            name="lastName"
            placeholder="Last Name"
            required
            className="input w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800">Contact Number</label>
          <input
            name="phone"
            placeholder="Contact Number"
            required
            className="input w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800">Delivery Address</label>
          <textarea
            name="address"
            placeholder="Delivery Address"
            required
            className="textarea w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800">Additional Notes</label>
          <textarea
            name="notes"
            placeholder="Additional Notes"
            className="textarea w-full"
          />
        </div>

        <button className="btn bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] text-white w-full
        hover:scale-105">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Booking;
