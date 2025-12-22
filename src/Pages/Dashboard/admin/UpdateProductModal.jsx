import { useState } from "react";
import toast from "react-hot-toast";

const UpdateProductModal = ({ product, setProducts, onClose }) => {
  const [formData, setFormData] = useState({
    name: product.name || "",
    shortDescription: product.shortDescription || "",
    longDescription: product.longDescription || "",
    price: product.price || "",
    category: product.category || "",
    images: product.images?.join(", ") || "",
    demoVideo: product.demoVideo || "",
    paymentOption:  product.paymentOptions?.[0] || "Cash on Delivery",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...formData,
      price: Number(formData.price),
      images: formData.images.split(",").map(img => img.trim()),
    };

    const res = await fetch(
      `https://garment-track-server-zeta.vercel.app/productsData/${product._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedProduct),
      }
    );

    if (res.ok) {
      const data = await res.json();

      setProducts(prev =>
        prev.map(p => (p._id === product._id ? data : p))
      );

      toast.success("Product Updated Successfully");
      onClose();
    } else {
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>

        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Short Description"
            className="textarea textarea-bordered w-full"
            required
          />

          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            placeholder="Long Description"
            className="textarea textarea-bordered w-full"
            required
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="input input-bordered w-full"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option>Shirt</option>
            <option>Pant</option>
            <option>Jacket</option>
            <option>Accessories</option>
          </select>

          <input
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="Image URLs (comma separated)"
            className="input input-bordered w-full"
          />

          <input
            name="demoVideo"
            value={formData.demoVideo}
            onChange={handleChange}
            placeholder="Demo Video Link (optional)"
            className="input input-bordered w-full"
          />

          <select
            name="paymentOption"
            value={formData.paymentOption}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option>Cash on Delivery</option>
            <option>Stripe</option>
          </select>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>

            <button type="submit" className="btn bg-orange-500 text-white">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
