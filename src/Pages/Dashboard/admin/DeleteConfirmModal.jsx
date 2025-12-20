import toast from "react-hot-toast";

const DeleteConfirmModal = ({ product, setProducts, onClose }) => {


  const handleDelete = async () => {
  const res = await fetch(`http://localhost:5000/productsData/${product._id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();

  if (data.deletedCount > 0) {
    toast.success("Deleted successfully");
    setProducts(prev => prev.filter(p => p._id !== product._id));
    onClose();
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96 text-center">
        <h3 className="text-lg font-bold mb-4">
          Delete this product?
        </h3>

        <p className="mb-4 text-gray-600">{product.name}</p>

        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="btn btn-sm">
            Cancel
          </button>
          <button onClick={handleDelete} className="btn btn-sm btn-error">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
