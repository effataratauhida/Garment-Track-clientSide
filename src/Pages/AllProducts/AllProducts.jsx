import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://garment-track-server-zeta.vercel.app/productsData")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="pt-24  ">
      <div className="max-w-11/12 mx-auto px-5">
        {/* Section Title */}
        <h2 className="text-2xl md:text-4xl font-extrabold text-center
        bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] 
        bg-clip-text text-transparent mb-12">
          All Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map(product => (
            <div
              key={product._id}
              className="bg-gray-50 rounded-xl  shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-h-80 w-full brightness-75"
                />

                {/* Category Badge */}
                <span className="absolute top-3 right-3 
                bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] text-white text-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-2">
                  {product.shortDescription}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-gray-600  mb-3">Price: <span className='text-gray-800 font-bold text-lg'>
                  ${product.price}</span></p>
                  <span className="text-sm text-gray-500">
                    Available Quantity: {product.availableQuantity}
                  </span>
                </div>

                {/* View Details Button */}
                <Link
                  to={`/productDetails/${product._id}`}
                  className="block text-center w-full py-2 rounded-md font-semibold bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))]
                   text-white hover:scale-105 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
