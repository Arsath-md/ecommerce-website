import { useState, useEffect } from "react";
import Nav from "../components/nav";
import Productcard from "../components/tredningProductcard";
import Footer from "./Footer";
import Testimonial from "./testimonal";
import Categories from "./catagorry";
import Allproducts from "../product/allproductcatagory";
import Features from "../product/features";

export default function Home() {
    const [offers, setOffers] = useState([]);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [index, setIndex] = useState(0);

    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return;

        const x = (e.clientX - window.innerWidth / 2) / 40;
        const y = (e.clientY - window.innerHeight / 2) / 40;

        setPosition({ x, y });
    };

    // FETCH OFFERS
    useEffect(() => {
        const fetchoffer = async () => {
            try {
                const res = await fetch("http://localhost:5000/getoffer");
                const datam = await res.json();
                setOffers(datam);
            } catch (e) {
                console.log(e);
            }
        };

        fetchoffer();
    }, []);

    // AUTO SLIDER
    useEffect(() => {
        if (!offers.length) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % offers.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [offers]);

    return (
        <>
            <div
                onMouseMove={handleMouseMove}
                className="
                relative
                w-full
                overflow-hidden
                bg-black
                antialiased
                "
            >
                <Nav />

                {/* HERO SECTION */}
                <div
                    className="
                    relative
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    min-h-screen
                    px-4
                    sm:px-6
                    md:px-10
                    pt-24
                    pb-14
                    gap-6
                    bg-gradient-to-b
                    from-black
                    via-zinc-950
                    to-black
                    overflow-hidden
                    "
                >
                    {/* BACKGROUND GLOW */}
                    <div className="absolute top-0 left-0 h-[300px] w-[300px] bg-orange-500/20 blur-3xl rounded-full"></div>

                    {/* LEFT CONTENT */}
                    <div className="flex flex-col justify-center relative z-10">

                        {/* TAG */}
                        <div
                            className="
                            inline-block
                            w-fit
                            bg-orange-500/10
                            text-orange-300
                            px-4
                            py-2
                            rounded-full
                            text-xs
                            sm:text-sm
                            font-semibold
                            mb-6
                            border
                            border-orange-400/20
                            backdrop-blur-xl
                            "
                        >
                            New Fashion Collection 2026
                        </div>

                        {/* TITLE */}
                        <h1
                            className="
                            text-[2.7rem]
                            sm:text-6xl
                            md:text-7xl
                            font-extrabold
                            leading-[0.95]
                            tracking-tight
                            text-white
                            max-w-[320px]
                            sm:max-w-full
                            "
                        >
                            Upgrade Your{" "}
                            <span className="text-orange-400">
                                Fashion
                            </span>
                            <br />
                            With Modern Streetwear
                        </h1>

                        {/* DESCRIPTION */}
                        <p
                            className="
                            py-6
                            text-sm
                            sm:text-lg
                            text-white/70
                            leading-relaxed
                            max-w-[550px]
                            "
                        >
                            Explore premium hoodies, sneakers,
                            and modern outfits designed for comfort,
                            confidence, and next-level street fashion.
                        </p>

                        {/* CTA */}
                        <div
                            className="
                            flex
                            flex-col
                            sm:flex-row
                            gap-3
                            mt-2
                            w-full
                            sm:w-auto
                            "
                        >
                            <button
                                className="
                                w-full
                                sm:w-auto
                                rounded-full
                                bg-orange-500
                                px-7
                                py-4
                                font-bold
                                text-white
                                shadow-[0_10px_40px_rgba(249,115,22,0.45)]
                                hover:scale-[1.03]
                                active:scale-95
                                transition-all
                                "
                            >
                                Explore Collection
                            </button>

                            <button
                                className="
                                w-full
                                sm:w-auto
                                rounded-full
                                border
                                border-white/15
                                bg-white/5
                                backdrop-blur-xl
                                px-7
                                py-4
                                font-semibold
                                text-white
                                hover:bg-white
                                hover:text-black
                                transition-all
                                "
                            >
                                Shop Now →
                            </button>
                        </div>

                        {/* STATS */}
                        <div
                            className="
                            grid
                            grid-cols-3
                            gap-3
                            mt-10
                            "
                        >
                            {[
                                ["10K+", "Happy Customers"],
                                ["500+", "Products"],
                                ["4.9★", "Rating"]
                            ].map(([num, text]) => (

                                <div
                                    key={num}
                                    className="
                                    bg-white/5
                                    border
                                    border-white/10
                                    backdrop-blur-xl
                                    rounded-2xl
                                    p-4
                                    text-center
                                    "
                                >
                                    <h2 className="text-xl font-black text-orange-400">
                                        {num}
                                    </h2>

                                    <p className="text-xs text-white/60 mt-1">
                                        {text}
                                    </p>
                                </div>

                            ))}
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative flex justify-center items-center mt-6 md:mt-0">

                        {/* GLOW */}
                        <div
                            className="
                            absolute
                            h-[240px]
                            w-[240px]
                            sm:h-[320px]
                            sm:w-[320px]
                            bg-orange-500/30
                            blur-3xl
                            rounded-full
                            animate-pulse
                            "
                        ></div>

                        {/* RING */}
                        <div
                            className="
                            absolute
                            h-[280px]
                            w-[280px]
                            border
                            border-white/10
                            rounded-full
                            "
                        ></div>

                        {/* IMAGE */}
                        <div
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px)`
                            }}
                            className="transition-transform duration-200 ease-out"
                        >
                            <img
                                src="/image.png"
                                alt="hoodie"
                                className="
                                relative
                                z-10
                                h-[360px]
                                sm:h-[520px]
                                md:h-[700px]
                                object-contain
                                drop-shadow-[0_20px_80px_rgba(255,165,0,0.55)]
                                "
                            />
                        </div>
                    </div>
                </div>

                {/* TRENDING OFFERS */}
                <div className="px-4 sm:px-6 md:px-10 mt-10">

                    {/* HEADING */}
                    <div className="flex items-center justify-between mb-7">

                        <h1
                            className="
                            font-black
                            text-white
                            text-2xl
                            sm:text-5xl
                            tracking-tight
                            "
                        >
                            Trending Offers
                        </h1>

                        <div className="h-[2px] w-20 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
                    </div>

                    {/* SLIDER */}
                    <div
                        className="
                        overflow-hidden
                        rounded-[30px]
                        w-full
                        border
                        border-white/10
                        shadow-2xl
                        "
                    >
                        <div
                            className="
                            flex
                            transition-transform
                            duration-700
                            ease-in-out
                            "
                            style={{
                                transform: `translateX(-${index * 100}%)`
                            }}
                        >
                            {offers?.map((items) => (

                                <div
                                    className="min-w-full relative group"
                                    key={items._id}
                                >

                                    {/* IMAGE */}
                                    <img
                                        src={items.imgs}
                                        alt="offer"
                                        className="
                                        h-[420px]
                                        sm:h-[500px]
                                        md:h-[550px]
                                        w-full
                                        object-cover
                                        group-hover:scale-105
                                        transition-transform
                                        duration-700
                                        "
                                    />

                                    {/* OVERLAY */}
                                    <div className="absolute inset-0 bg-black/45"></div>

                                    {/* GRADIENT */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>

                                    {/* CONTENT */}
                                    <div
                                        className="
                                        absolute
                                        inset-0
                                        flex
                                        items-end
                                        sm:items-center
                                        "
                                    >
                                        <div
                                            className="
                                            p-5
                                            sm:p-10
                                            md:p-14
                                            max-w-[95%]
                                            sm:max-w-[650px]
                                            "
                                        >

                                            {/* TAG */}
                                            <span
                                                className="
                                                bg-orange-500/20
                                                text-orange-300
                                                border
                                                border-orange-400/30
                                                px-4
                                                py-1
                                                rounded-full
                                                text-xs
                                                sm:text-sm
                                                backdrop-blur-md
                                                tracking-widest
                                                "
                                            >
                                                LIMITED DROP
                                            </span>

                                            {/* TITLE */}
                                            <h2
                                                className="
                                                mt-4
                                                text-2xl
                                                sm:text-5xl
                                                md:text-6xl
                                                font-black
                                                leading-[1]
                                                tracking-tight
                                                text-white
                                                "
                                            >
                                                {items.o_name}
                                            </h2>

                                            {/* OFFER */}
                                            <p
                                                className="
                                                mt-3
                                                text-sm
                                                sm:text-lg
                                                text-white/75
                                                leading-relaxed
                                                max-w-[320px]
                                                sm:max-w-[500px]
                                                "
                                            >
                                                {items.offer}
                                            </p>

                                            {/* BUTTONS */}
                                            <div className="flex gap-3 mt-6">

                                                <button
                                                    className="
                                                    bg-orange-500
                                                    hover:bg-orange-600
                                                    px-5
                                                    py-3
                                                    rounded-full
                                                    font-bold
                                                    text-white
                                                    transition-all
                                                    duration-300
                                                    shadow-lg
                                                    hover:scale-105
                                                    "
                                                >
                                                    Shop Now
                                                </button>

                                                <button
                                                    className="
                                                    border
                                                    border-white/20
                                                    bg-white/10
                                                    backdrop-blur-md
                                                    px-5
                                                    py-3
                                                    rounded-full
                                                    font-semibold
                                                    text-white
                                                    hover:bg-white/20
                                                    transition-all
                                                    "
                                                >
                                                    Explore
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>

                {/* FEATURES */}
                <Features />

                {/* PRODUCTS */}
                <div className="px-4 sm:px-6 md:px-10 py-10">
                    <Productcard />
                </div>

                <Allproducts />

                <Categories />

                <Testimonial />

                <Footer />
            </div>
        </>
    );
}