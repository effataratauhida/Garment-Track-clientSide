import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from './../../Hooks/useAuth';

 
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();


  //const user = { role: "buyer", status: "approved" }; 

 useEffect(() => {
  fetch(`https://garment-track-server-zeta.vercel.app/productsData/${id}`)
    .then(res => res.json())
    .then(data => {
    //   const selected = data.find(
    //     item => item._id.toString() === id
    //   );
      setProduct(data);
      setActiveImage(data.images[0]);
      setLoading(false);
    });
}, [id]);



  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-20">Product not found</p>;
  }

  // Order button roles
  const canOrder =
    user &&
    user.role === "buyer" &&
    user.status === "approved";




  return (
    <section className="py-16 mt-10 bg-gray-50 min-h-screen">
      <div className="max-w-11/12 mx-auto px-6 grid md:grid-cols-2 gap-10">

        {/* Images */}
        <div>
          <img
            src={activeImage}
            alt={product.name}
            className="w-full max-h-full rounded-xl mb-4  "
          />
          </div>

        {/* Product Information */}
        <div>

             {/* Extra Images */}
          <div className="flex gap-3 mb-6">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="preview"
                onClick={() => setActiveImage(img)}
                 className={`w-20 h-20 object-cover rounded cursor-pointer border
        ${activeImage === img ? "border-[#005a32] ring-2 ring-[#005a32]" : ""}
      `}
                
              />
            ))}
          </div>

          <span className="inline-block mb-2 bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] text-white px-4 py-1 rounded-full text-sm">
            {product.category}
          </span>

          <h2 className="text-3xl font-bold mb-3 text-gray-800">{product.name}</h2>

          <p className="text-gray-700 mb-4">
            {product.longDescription}
          </p>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Price:</strong>{" "}
              <span className="text-gray-800 font-semibold">
                ${product.price}
              </span>
            </p>
            <p>
              <strong>Available Quantity:</strong>{" "}
              {product.availableQuantity}
            </p>
            <p>
              <strong>Minimum Order:</strong>{" "}
              {product.minimumOrderQuantity}
            </p>
            <p>
              <strong>Payment Options:</strong>{" "}
              {product.paymentOptions.join(", ")}
            </p>
          </div>

          {/* Order Button */}
          <div className="mt-6">
            {canOrder ? (
              <button
                onClick={() => navigate(`/booking/${product._id}`)}
                className="px-8 py-3 bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))]
                 text-white font-semibold rounded-md hover:scale-105 cursor-pointer "
              >
                Order Now
              </button>
            ) : (
              <button
                disabled
                className="px-8 py-3 bg-gray-400 text-white font-semibold rounded-md cursor-not-allowed"
              >
                Order Not Available
              </button>
            )}

            {!canOrder && user?.role === "buyer" && user.status !== "approved" && (
              <p className="text-sm text-red-500 mt-2">
                Your account is not approved by Admin yet. Only approved buyers can place orders.
              </p>
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ProductDetails;
