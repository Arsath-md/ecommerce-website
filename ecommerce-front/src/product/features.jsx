import React from "react";
import {
  FiTruck,
  FiRefreshCcw,
  FiShield,
} from "react-icons/fi";

const features = [
  {
    icon: <FiTruck size={30} />,
    title: "24 Hour Dispatch",
    desc: "Fast dispatch on all ready-to-ship products.",
  },
  {
    icon: <FiRefreshCcw size={30} />,
    title: "Easy Returns",
    desc: "Hassle-free returns and exchanges.",
  },
  {
    icon: <FiShield size={30} />,
    title: "Premium Quality",
    desc: "Crafted with premium fabrics and attention to detail.",
  },
];

const Features = () => {
  return (
    <section className="bg-black py-14 px-5 flex justify-center items-center">
<div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="
              bg-[#111]
              border
              border-white/10
              rounded-2xl
              p-8
              text-center
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-white 
            "
          >
            <div className="flex justify-center text-white mb-5">
              {item.icon}
            </div>

            <h3 className="text-white text-xl font-semibold mb-3">
              {item.title}
            </h3>

            <p className="text-gray-400 text-sm leading-7">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Features;