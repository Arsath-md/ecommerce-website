import { FaStar } from "react-icons/fa";

export default function Testimonial() {

    const testimonials = [
        {
            id: 1,
            name: "Arjun Kumar",
            role: "Fashion Influencer",
            image: "https://i.pravatar.cc/300?img=12",
            review:
                "Absolutely premium quality. The hoodie fabric feels amazing and the fit is perfect. Highly recommended for streetwear lovers.",
        },
        {
            id: 2,
            name: "Rahul Sharma",
            role: "College Student",
            image: "https://i.pravatar.cc/300?img=15",
            review:
                "The sneakers and hoodies completely upgraded my style. Delivery was fast and packaging looked premium.",
        },
        {
            id: 3,
            name: "Vikram Raj",
            role: "Gym Trainer",
            image: "https://i.pravatar.cc/300?img=18",
            review:
                "One of the best online fashion stores I’ve used. The quality matches expensive brands.",
        },
        {
            id: 4,
            name: "Karthik",
            role: "Software Developer",
            image: "https://i.pravatar.cc/300?img=20",
            review:
                "Modern designs, comfortable outfits, and clean UI experience. Everything feels professional.",
        },
    ];

    return (
        <div className="mt-20 bg-gradient-to-r from-black via-gray-900 to-black px-5 sm:px-6 md:px-10 py-16 overflow-hidden rounded-t-[40px]">

            {/* HEADING */}
            <div className="mb-10 md:mb-14">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                    What Our Customers Say
                </h1>

                <p className="text-sm sm:text-base text-white/60 mt-4 max-w-2xl leading-relaxed">
                    Trusted by thousands of fashion lovers across the country.
                    Experience premium streetwear designed for comfort,
                    confidence, and modern lifestyle.
                </p>
            </div>

            {/* SLIDER */}
            <div className="relative overflow-hidden group">

                <div
                    className="flex gap-5 w-max animate-scroll 
                    group-hover:[animation-play-state:paused] 
                    active:[animation-play-state:paused]"
                >

                    {[...testimonials, ...testimonials].map((item, index) => (

                        <div
                            key={index}
                            className="min-w-[280px] sm:min-w-[340px] md:min-w-[400px]
                            bg-white/5 backdrop-blur-xl border border-orange-400/10
                            rounded-3xl p-5 sm:p-6
                            shadow-[0_10px_50px_rgba(255,140,0,0.15)]
                            flex-shrink-0 transition duration-300 hover:scale-[1.03]"
                        >

                            {/* TOP SECTION */}
                            <div className="flex items-center gap-4">

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover border-2 border-orange-400 shadow-lg"
                                />

                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold text-white">
                                        {item.name}
                                    </h2>
                                    <p className="text-sm text-orange-300/80">
                                        {item.role}
                                    </p>
                                </div>

                            </div>

                            {/* STARS */}
                            <div className="flex gap-1 mt-5 text-yellow-400">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>

                            {/* REVIEW */}
                            <p className="text-sm sm:text-base text-white/70 leading-relaxed mt-5">
                                "{item.review}"
                            </p>

                            {/* BOTTOM LINE */}
                            <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-orange-400/50 to-transparent rounded-full" />
                        </div>

                    ))}

                </div>
            </div>
        </div>
    );
}