import React, { useEffect, useState } from 'react';
import heroImg from '../../assets/heroImg.jpg'
import { Link } from 'react-router';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


const Home = () => {

    const steps = [
  {
    id: 1,
    title: "Place Order",
    desc: "Record buyer order with style, quantity and due date.",
  },
  {
    id: 2,
    title: "Plan & Schedule",
    desc: "Allocate production slots and prepare materials.",
  },
  {
    id: 3,
    title: "Assign Tasks",
    desc: "Assign jobs to sections, machines and operators.",
  },
  {
    id: 4,
    title: "Track Production",
    desc: "Monitor cutting → sewing → finishing progress in real-time.",
  },
  {
    id: 5,
    title: "Inventory & QC",
    desc: "Control raw materials and perform quality checks.",
  },
  {
    id: 6,
    title: "Dispatch & Delivery",
    desc: "Pack, ship and confirm delivery to buyers.",
  },
];
const feedbacks = [
  {
    name: "Sarah Khan",
    product: "Men's Denim Jacket",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=32",
    message: "Great quality! The production was smooth and delivery was faster than expected.",
  },
  {
    name: "John Miller",
    product: "Women’s Hoodie",
    rating: 4,
    photo: "https://i.pravatar.cc/150?img=12",
    message: "Fabric and stitching are impressive. Will definitely order again!",
  },
  {
    name: "Amina Rahman",
    product: "Kids T-Shirt Bulk Order",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=45",
    message: "Perfect bulk order service! Accurate sizing and timely delivery.",
  },
];
    const [current, setCurrent] = useState(0);
    const length = feedbacks.length;
    useEffect(() => {
        const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % length);
        }, 3000);
        return () => clearInterval(timer);
        }, [length]);

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + length) % length);
    };
    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % length);
    };
    const faqs = [
  {
    q: "What is this system used for?",
    a: "It helps garment factories manage buyer orders, production stages, and timely delivery.",
  },
  {
    q: "Do I need technical skills to use it?",
    a: "No, the system is beginner-friendly and easy for factory staff to use.",
  },
  {
    q: "Can I track every production stage?",
    a: "Yes, you can track Cutting, Sewing, Finishing, QC, and Delivery in real-time.",
  },
  {
    q: "Does it support multiple buyers and orders?",
    a: "Yes, you can manage unlimited buyers, orders, and production batches.",
  },
  {
    q: "Is my factory data secure?",
    a: "Yes, all data is protected with modern authentication and security layers.",
  },
    ];
    const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
    const benefits = [
    {
      title: "Faster Production Updates",
      desc: "Get real-time progress from cutting to delivery with zero delays.",
    },
    {
      title: "Reduce Delays & Miscommunication",
      desc: "Track every order in one place and avoid production bottlenecks.",
    },
    {
      title: "Zero Manual Errors",
      desc: "Automated tracking removes Excel mistakes and boosts accuracy.",
    },
    {
      title: "Centralized Data System",
      desc: "Buyers, orders, production, and inventory—everything stays organized.",
    },
    {
      title: "Access From Anywhere",
      desc: "Use the system from mobile, tablet, or desktop—anytime.",
    },
    {
      title: "Improve On-Time Delivery",
      desc: "Stay ahead with timely stage updates and instant notifications.",
    },
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch("http://localhost:5000/productsData/limit")
      .then(res => res.json())
      .then(data => {
        //console.log("Products:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20 min-h-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }


    return (
        <div>
            {/* hero section */}
            <div className="relative w-full h-[450px] md:h-130 flex items-center bg-cover bg-center" 
            style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="absolute inset-0 bg-black/70"></div>

                {/* Content */}
                <div className="relative z-10 px-6 md:px-16 max-w-3xl">
                    <h2 className="text-2xl md:text-4xl font-extrabold 
                    bg-[linear-gradient(90deg,rgba(232,105,70,1),rgba(249,212,35,1))] bg-clip-text text-transparent mb-4">
                        Garments Order & Production Tracker System</h2>
            
                  <p className="text-white/90 md:text-lg mb-6">
                    A complete web solution to manage buyer orders, streamline production
                    stages, monitor inventory, and ensure on-time delivery with real-time
                    tracking and transparency.
                  </p>
            
                  <Link
                    to="/allProducts"
                    className="btn bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] 
                    hover:scale-110 border-orange-500 text-white mt-2 text-base">
                        View All Products <FaArrowUpRightFromSquare/> </Link>
                </div>
            </div>

            {/* our products */}

            <section className='mt-14'>
              <div className='max-w-11/12 mx-auto'>
                <h3 className="text-2xl text-center md:text-4xl font-extrabold
                    bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] bg-clip-text text-transparent">
                      Our Products
                </h3>
              
              
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {products.map(product => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-h-96 w-full  brightness-90"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {product.shortDescription}
                </p>
                <p className="text-sm text-gray-600  mb-3">Price: <span className='text-gray-800 font-bold text-lg'>
                  ${product.price}</span></p>

                <Link
                  to={`/productDetails/${product._id}`}
                  className="block text-center bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))]
                  hover:scale-105 text-white font-semibold py-2 rounded-md "
                >
                  View Details
                </Link>
              </div>
            </div>
           
          ))}


             </div>       
              </div>
            </section>

            {/* how it works */}
            <section className="mt-16 ">
                <div className="max-w-11/12 mx-auto px-6">
        
                    <div className="max-w-2xl mx-auto text-center mb-8">
                        <h3 className="text-2xl md:text-4xl font-extrabold
                        bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] bg-clip-text text-transparent">
                          How It Works
                        </h3>
                        <p className="text-gray-600 mt-2">
                          A simple 6-step workflow that takes an order from buyer to delivery.
                        </p>
                    </div>

                    {/* steps */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s) => (
            <article
              key={s.id}
              className="relative bg-gray-50 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
              aria-labelledby={`how-step-${s.id}`}
            >
              <div className="flex items-start gap-4">
                {/* Number / Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center
                        bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] text-white font-bold">
                    {s.id}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h4 id={`how-step-${s.id}`} className="text-lg font-semibold">
                    {s.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
                </div>
              </div>

              {/* optional small badge or CTA - hidden on mobile */}
              <div className="absolute right-4 bottom-4 hidden md:block">
                <span className="text-xs px-2 py-1 rounded-full bg-white/60 backdrop-blur-sm text-gray-700">
                  Step {s.id}
                </span>
              </div>
            </article>
          ))}
                    </div>
                </div>
            </section>

            {/*customer feedback  */}
            <section className="mt-16  ">
                <div className="max-w-11/12 mx-auto px-6">
                    <h2 className="text-center text-2xl md:text-4xl font-extrabold 
                    bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] bg-clip-text text-transparent">
                      Customer's Feedback</h2>
                      <p className='text-center text-gray-600 mt-2 mb-10'>Real feedback from real buyers — success in every order.</p>
        
                <div className="relative max-w-3xl mx-auto">
                    {/* Slide */}
                    {feedbacks.map((fb, index) => (
                    <div key={index}
                        className={`transition-all duration-700 ${
                        index === current ? "block" : "hidden"
                        } bg-gray-50 p-6 rounded-xl shadow-lg text-center`}>
                            <h4 className="font-bold text-lg">{fb.name}</h4>
                            <p className="text-sm text-gray-500 mb-2">
                              Bought: <span className="font-medium">{fb.product}</span>
                            </p>
                    <div className="flex justify-center mb-4">
                        {[...Array(fb.rating)].map((_, idx) => (
                          <span key={idx} className="text-yellow-400 text-xl">
                            ★
                          </span>
                        ))}
                    </div>
                    <p className="text-gray-600 italic">“{fb.message}”</p>
                    </div>
                    ))}

                    {/* Arrows */}
                    <button
                      onClick={prevSlide}
                      className="absolute top-1/2 left-0 -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                    >
                      ◀
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute top-1/2 right-0 -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                    >
                      ▶
                    </button>
                </div>
                </div>
            </section>

            {/* frequently asked question */}

                <section className="mt-16  ">
                  <div className="max-w-11/12 mx-auto px-6">
                    <h2 className="text-center text-2xl md:text-4xl font-extrabold 
                    bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] bg-clip-text text-transparent mb-8">
                      Frequently Asked Questions
                    </h2>
            
                    {faqs.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-300 py-4 cursor-pointer max-w-3xl mx-auto"
                        onClick={() => toggleFAQ(index)}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">{item.q}</h3>
                          <span className="text-xl">
                            {openIndex === index ? "−" : "+"}
                          </span>
                        </div>
            
                        {openIndex === index && (
                          <p className="mt-2 text-gray-600">{item.a}</p>
                    )}
                    </div>
                    ))}
                </div>
               </section>

               {/* why choose us */}

               <section className="pt-16 bg-red-400 ">
      <div className="max-w-11/12 mx-auto px-6">
        <h2 className="text-center text-2xl md:text-4xl font-extrabold 
                    bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] bg-clip-text text-transparent mb-10">
          Why Choose Our System?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>


        </div>
    );
};

export default Home;