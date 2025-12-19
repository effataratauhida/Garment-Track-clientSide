import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UpdateProductModal from "./UpdateProductModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //  fetch all products
  useEffect(() => {
    fetch("http://localhost:5000/productsData", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => toast.error("Failed to load products"));
  }, []);

  //  toggle show on home
  const handleToggleHome = async (product) => {
    const res = await fetch(
      `http://localhost:5000/productsData/showHome/${product._id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ showOnHome: !product.showOnHome }),
      }
    );

    if (res.ok) {
      setProducts(prev =>
        prev.map(p =>
          p._id === product._id
            ? { ...p, showOnHome: !p.showOnHome }
            : p
        )
      );
      toast.success("Updated");
    }
    //console.log("clicked", _id);

  };

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center md:text-4xl font-extrabold pb-5
          bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] bg-clip-text text-transparent">All Products</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Created By</th>
            <th>Show on Home</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>
                <img
  src={product.images?.[0]}
  alt={product.name}
  className="w-12 h-12 rounded object-cover"
/>
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.createdBy || "Admin"}</td>

              <td>
                <input
                  type="checkbox"
                  checked={product.showOnHome}
                  onChange={() => handleToggleHome(product)}
                  className="toggle toggle-success"
                />
              </td>

              <td className="space-x-2">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowUpdateModal(true);
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowDeleteModal(true);
                  }}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {showUpdateModal && (
        <UpdateProductModal
          product={selectedProduct}
          setProducts={setProducts}
          onClose={() => setShowUpdateModal(false)}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteConfirmModal
          product={selectedProduct}
          setProducts={setProducts}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default AllProduct;
