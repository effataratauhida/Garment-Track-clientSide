import { useState } from "react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    shortDescription: "",
    longDescription: "",
    category: "",
    price: "",
    availableQuantity: "",
    minimumOrderQuantity: "",
    demoVideo: "",
    paymentOptions: "",
    images: "",  
    showOnHome: false,
  });

//   const [images, setImages] = useState([]);
//   const [preview, setPreview] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

//   const handleImages = e => {
//     const files = Array.from(e.target.files);
//     setImages(files);
//     setPreview(files.map(file => URL.createObjectURL(file)));
//   };

  const handleSubmit = async e => {
    e.preventDefault();

   if (!form.images || !form.images.trim()) {
  toast.error("Please provide product image URL");
  return;
}


//     const uploadedUrls = [];

//   for (const file of images) {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

//     const res = await fetch(
//       "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
//       { method: "POST", body: formData }
//     );
//     const data = await res.json();
//     uploadedUrls.push(data.secure_url);
//   }

    const product = {
      name: form.name,
      shortDescription: form.shortDescription,
      longDescription: form.longDescription,
      category: form.category,
      price: Number(form.price),
      availableQuantity: Number(form.availableQuantity),
      minimumOrderQuantity: Number(form.minimumOrderQuantity),
      images: form.images
      .split(",")
      .map(img => img.trim()),
      demoVideo: form.demoVideo,
      paymentOptions: [form.paymentOptions],
      showOnHome: false,
      createdBy: "Manager",
    };

    const res = await fetch("http://localhost:5000/productsData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(product),
    });

    if (res.ok) {
      toast.success("Product added successfully");
      e.target.reset();
    } else {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl text-center md:text-4xl font-extrabold mb-6
          bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] bg-clip-text text-transparent" >
        Add New Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-100 p-6 rounded-lg"
      >
        {/* Product Name */}
        <div>
          <label className="label font-semibold">Product Name</label>
          <input
            name="name"
            onChange={handleChange}
            required
            className="input input-bordered w-full mt-2"
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="label font-semibold">Short Description</label>
          <input
            name="shortDescription"
            onChange={handleChange}
            required
            className="input input-bordered w-full mt-2"
          />
        </div>

        {/* Long Description */}
        <div>
          <label className="label font-semibold">Long Description</label>
          <textarea
            name="longDescription"
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full mt-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="label font-semibold">Category</label>
          <select
            name="category"
            onChange={handleChange}
            required
            className="select select-bordered w-full mt-2"
          >
            <option value="">Select Category</option>
            <option>Shirt</option>
            <option>Pant</option>
            <option>Jacket</option>
            <option>Accessories</option>
            <option>Kameez</option>
            <option>Kids Pant</option>
            <option>Woman's Pant</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="label font-semibold">Price</label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            required
            className="input input-bordered w-full mt-2"
          />
        </div>

        {/* Available Quantity */}
        <div>
          <label className="label font-semibold">Available Quantity</label>
          <input
            type="number"
            name="availableQuantity"
            onChange={handleChange}
            required
            className="input input-bordered w-full mt-2"
          />
        </div>

        {/* MOQ */}
        <div>
          <label className="label font-semibold">Minimum Order Quantity (MOQ)</label>
          <input
            type="number"
            name="minimumOrderQuantity"
            onChange={handleChange}
            required
            className="input input-bordered w-full mt-2"
          />
        </div>

        {/* Demo Video */}
        <div>
          <label className="label font-semibold">Demo Video Link (optional)</label>
          <input
            type="text"
            name="demoVideo"
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>

        {/* Payment Options */}
        <div>
          <label className="label font-semibold">Payment Option</label>
          <select
            name="paymentOptions"
            onChange={handleChange}
            required
            className="select select-bordered w-full mt-2"
          >
            <option value="">Select Payment Option</option>
            <option value="Stripe">Stripe</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            {/* <option value="PayFirst">PayFirst</option> */}
          </select>
        </div>

        {/* Images */}
       <div>
            <label className="label font-semibold">
              Product Image URLs
              <span className="text-sm text-gray-500">, </span>
            </label>
          
            <input
              type="text"
              name="images"
              placeholder="https://img1.jpg, https://img2.jpg"
              onChange={(e) =>
                setForm({ ...form, images: e.target.value })
              }
              className="input input-bordered w-full mt-2"
              required
            />
            </div>

        <button className="btn bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] hover:scale-105 text-white mt-2">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
