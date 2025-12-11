import React from 'react';
import heroImg from '../../assets/heroImg.jpg'
import { Link } from 'react-router';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';


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

    return (
        <div>
            {/* hero section */}
            <div className="relative w-full h-[450px] md:h-130 flex items-center bg-cover bg-center" 
            style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="absolute inset-0 bg-black/70"></div>

                {/* Content */}
                <div className="relative z-10 px-6 md:px-16 max-w-3xl">
                    <h2 className="text-2xl md:text-4xl font-bold 
                    bg-[linear-gradient(90deg,rgba(232,105,70,1),rgba(249,212,35,1))] bg-clip-text text-transparent mb-4">
                        Garments Order & Production Tracker System</h2>
            
                  <p className="text-white/90 md:text-lg mb-6">
                    A complete web solution to manage buyer orders, streamline production
                    stages, monitor inventory, and ensure on-time delivery with real-time
                    tracking and transparency.
                  </p>
            
                  <Link
                    to="/availableFoods"
                    className="btn bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] 
                    hover:scale-110 border-orange-500 text-white mt-2 text-base">
                        View All Foods <FaArrowUpRightFromSquare/> </Link>
                </div>
            </div>

        </div>
    );
};

export default Home;