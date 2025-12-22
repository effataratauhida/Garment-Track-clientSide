import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteModalManager from "./DeleteModalManager";
import { useAuth } from "../../../Hooks/useAuth";
import ManageProductsUpdateModalManager from './ManageProductsUpdateModalManager';

const ManagerManageProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(null);

  useEffect(() => {
    fetch(
      `https://garment-track-server-zeta.vercel.app/productsData/manager`,
      { credentials: "include" }
    )
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load products"));
  }, [user.email]);

  // search filter
  const filteredProducts = products.filter(product =>
  product.name?.toLowerCase().includes(search.toLowerCase()) ||
  product.category?.toLowerCase().includes(search.toLowerCase())
);

//console.log(products)

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center md:text-4xl font-extrabold mb-6
          bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] bg-clip-text text-transparent">Manage Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or category"
        className="input input-bordered w-full mb-4"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment Mode</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map(product => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.images?.[0]}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.paymentOptions?.[0]}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => setUpdateProduct(product)
                    }
                    className="btn btn-xs bg-orange-500 text-white"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="btn btn-xs bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
{updateProduct && (
  <ManageProductsUpdateModalManager
    product={updateProduct}
    setProducts={setProducts}
    onClose={() => setUpdateProduct(null)}
  />
)}

      {/* Delete Modal */}
      {selectedProduct && (
        <DeleteModalManager
          product={selectedProduct}
          setProducts={setProducts}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ManagerManageProducts;
