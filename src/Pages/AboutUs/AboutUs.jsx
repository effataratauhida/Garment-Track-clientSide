// src/Pages/AboutUs/AboutUs.jsx
import React from "react";
import aboutImg from '../../assets/aboutImg.avif'
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      {/* Hero Section */}
      <div
        className="relative w-full h-64 md:h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutImg})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative z-10 text-2xl md:text-5xl font-extrabold
         bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] 
        bg-clip-text text-transparent text-center">
          About Us
        </h1>
      </div>

      {/* About Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div>
            <img
              src={aboutImg}
              alt="About Us"
              className="rounded-xl shadow-lg w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4 
            bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] 
        bg-clip-text text-transparent">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-4">
              Our system is designed to help garment factories manage buyer orders,
              streamline production stages, monitor inventory, and ensure on-time
              delivery. We believe in transparency, efficiency, and providing
              solutions that make production management easy and accurate.
            </p>
            <p className="text-gray-600 mb-4">
              With real-time tracking, centralized data, and user-friendly dashboards,
              factory managers and staff can focus on producing high-quality garments
              without worrying about delays or miscommunication.
            </p>
            <p className="text-gray-600">
              Our mission is to modernize garment production management and empower
              factories to achieve timely delivery and higher customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-12 bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] 
        bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
              <p className="text-gray-600">
                Streamlined workflows and real-time updates reduce delays and errors.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p className="text-gray-600">
                Every production stage is visible, ensuring accountability and trust.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Cutting-edge tools to simplify garment order management.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
