import { FaTshirt } from "react-icons/fa";
import { GiConverseShoe, GiHoodie } from "react-icons/gi";

export default function Categories() {
const BASE_URL = import.meta.env.VITE_API_URL;

    const categories = [
        {
            id: 1,
            name: "Hoodies",
            icon: <GiHoodie />,
            image:
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: 2,
            name: "T-Shirts",
            icon: <FaTshirt />,
            image:
                "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: 3,
            name: "Sneakers",
            icon: <GiConverseShoe />,
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: 4,
            name: "Sweaters",
            icon: null,
            image:
                "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
        },
    ];

    return (
        <div className="px-4 sm:px-6 md:px-10 py-16">

            {/* HEADING */}
            <div className="mb-10">

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                    Shop By Categories
                </h1>

                <p className="text-white/60 mt-3 text-sm sm:text-base max-w-2xl">
                    Discover premium fashion collections made for modern streetwear lovers.
                </p>

            </div>

            {/* CATEGORY GRID */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                {categories.map((item) => (
                    <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-3xl h-[320px] cursor-pointer transition-all duration-300 hover:-translate-y-2"
                    >

                        {/* IMAGE */}
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                        />

                        {/* DARK OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                        {/* CONTENT */}
                        <div className="absolute bottom-0 left-0 p-6 w-full">

                            {/* ICON */}
                            <div className="text-orange-400 text-4xl mb-3">
                                {item.icon}
                            </div>

                            {/* TITLE */}
                            <h2 className="text-2xl font-bold text-white">
                                {item.name}
                            </h2>

                            {/* BUTTON */}
                            <button className="mt-4 rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-white hover:bg-orange-600 transition">
                                Explore
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}