import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    Swal.fire({
      title: 'Message Sent!',
      text: `Thank you ${formData.name}, we have received your message.`,
      icon: 'success',
      confirmButtonColor: '#F83600',
    });

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-20 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Have questions or want to get in touch? Fill out the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Your Message"
              rows="5"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-yellow-400 hover:to-orange-500 text-white font-semibold py-3 rounded-md transition-all"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          <p>Email: support@garmenttrack.com</p>
          <p>Phone: +880 1234 567890</p>
          <p>Address: 123, Garment Street, Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
