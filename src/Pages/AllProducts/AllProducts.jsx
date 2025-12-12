import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllProducts = () => {

     const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading products...</p>
      </div>
    );
  }


  
    return (
        <div className='mt-16'>
              <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          All Products
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-all"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-60 w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <p className="text-[#005a32] font-bold mt-2">${product.price}</p>
                <p className="text-gray-500 mt-1 text-sm">
                  Available Quantity: {product.availableQuantity}
                </p>
                <p className="text-gray-500 text-sm">
                  Minimum Order: {product.minimumOrderQuantity}
                </p>
                <Link
                  to={`/product/${product._id}`}
                  className="mt-3 inline-block px-4 py-2 bg-[#005a32] text-white rounded hover:bg-[#238b45] transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
        </div>
    );
};

export default AllProducts;