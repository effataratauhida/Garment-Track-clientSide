import { useState } from "react";
import toast from "react-hot-toast";

const UpdateProductModal = ({ product, setProducts, onClose }) => {
  const [formData, setFormData] = useState(product);

  const handleSubmit = async () => {
    const res = await fetch(
      `http://localhost:5000/productsData/${product._id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (res.ok) {
      setProducts(prev =>
        prev.map(p => (p._id === product._id ? formData : p))
      );
      toast.success("Product updated");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[500px]">
        <h3 className="text-xl font-bold mb-4">Update Product</h3>

        <input
          className="input input-bordered w-full mb-2"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder="Product Name"
        />

        <input
          className="input input-bordered w-full mb-2"
          type="number"
          value={formData.price}
          onChange={e => setFormData({ ...formData, price: e.target.value })}
          placeholder="Price"
        />

        <input
          className="input input-bordered w-full mb-2"
          value={formData.category}
          onChange={e =>
            setFormData({ ...formData, category: e.target.value })
          }
          placeholder="Category"
        />

        <textarea
          className="textarea textarea-bordered w-full mb-4"
          value={formData.description}
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Description"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn btn-sm">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-sm btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
