import React, { useState } from "react";
import toast from "react-hot-toast";

const ManageProductsUpdateModalManager = ({ product, onClose, setProducts }) => {
  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || "",
    category: product.category || "",
    paymentOptions: product.paymentOptions?.[0] || "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `https://garment-track-server-zeta.vercel.app/productsData/${product._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data._id) {
        toast.success("Product updated successfully");
        setProducts(prev =>
          prev.map(p => (p._id === product._id ? data : p))
        );
        onClose();
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Update request failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96 text-center space-y-4">
        <h3 className="text-lg font-bold">Update Product</h3>

        <div className="text-left space-y-2">
          <label className="font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
          />

          <label className="font-medium">Price</label>
          <input
            type="text"
            name="price"
            placeholder="Price"
            className="input input-bordered w-full"
            value={formData.price}
            onChange={handleChange}
          />

          <label className="font-medium">Category</label>
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="input input-bordered w-full"
            value={formData.category}
            onChange={handleChange}
          />

          <label className="font-medium">Payment Option</label>
          <input
            type="text"
            name="paymentOptions"
            placeholder="Payment Option"
            className="input input-bordered w-full"
            value={formData.paymentOptions}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="btn btn-sm">
            Cancel
          </button>
          <button onClick={handleUpdate} className="btn btn-sm bg-orange-500 text-white">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProductsUpdateModalManager;
