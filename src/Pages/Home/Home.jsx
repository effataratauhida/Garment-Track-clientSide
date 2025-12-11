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

            {/* how it works */}
            <section className="bg-white py-12 md:py-14">
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
            <section className="py-16 ">
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

        </div>
    );
};

export default Home;