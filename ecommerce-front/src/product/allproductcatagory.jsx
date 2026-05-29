import { useEffect, useState } from "react";
import { FaSupple } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Allproducts() {
const BASE_URL = import.meta.env.VITE_API_URL;

    const [collects, setCollects] = useState([]);
    const [loadingId, setLoadingId] = useState(null);

    // categories
    const filters = [
        "hoodie",
        "tshirt",
        "sweater",
        "sneker"
    ];

    // FETCH PRODUCTS
    useEffect(() => {

        const allproduct = async () => {

            try {

                const res = await   fetch(`${BASE_URL}/filter`);


                const datum = await res.json();

                setCollects(datum);

            } catch (e) {

                console.log(
                    "there is an error in allproduct " + e
                );


            }

        };

        allproduct();

    }, [collects]);

    // ADD TO CART
    const sendData = async (id) => {

        // prevent spam click
        if (loadingId === id) return;

        try {

            setLoadingId(id);

            const response = await  fetch(`${BASE_URL}/addcart`, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        productid: id,
                        quantity: 1
                    })

                }
            );

            const datum = await response.json();

            console.log(datum);

            // ERROR
            if (datum.status) {
                           toast.success("added to cart");
            }
                else{
                    toast.error("login first")
                }
            // SUCCESS

        } catch (e) {

            console.log(e);

            toast.error("Server error");

        } finally {

            setLoadingId(null);

        }

    };

    return (

        <div className="min-h-screen bg-black px-4 sm:px-6 md:px-10 py-10">
                <ToastContainer/>
            {/* MAIN HEADING */}
            <div className="mb-12" id="catagory">

                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
                    Premium Collections
                </h1>

                <p className="text-white/60 mt-3">
                    Discover luxury streetwear fashion crafted for modern lifestyle.
                </p>

            </div>

            {/* CATEGORY SECTIONS */}
            {
                filters.map((category, index) => {

                    // FILTER PRODUCTS
                    const filteredProducts = collects.filter(
                        (item) => item.p_type === category
                    );

                    return (

                        <div className="mb-14" key={index}>

                            {/* CATEGORY TITLE */}
                            <div className="flex items-center justify-between mb-6">

                                <h2 className="text-2xl sm:text-4xl font-bold text-white capitalize">
                                    {category}
                                </h2>

                                <Link to={`/cat/${category}`}>

                                    <button className="text-orange-400 font-semibold hover:text-orange-500 transition">

                                        View All →

                                    </button>

                                </Link>

                            </div>

                            {/* PRODUCTS */}
                            <div
                                className="
                                flex
                                gap-5
                                overflow-x-auto
                                scrollbar-hide
                                snap-x
                                snap-mandatory
                                pb-2
                                "
                            >

                                {
                                    filteredProducts.length > 0 ? (

                                        filteredProducts.map((item) => (

                                            <div
                                                key={item._id}
                                                className="
                                                snap-start
                                                min-w-[220px]
                                                sm:min-w-[280px]
                                                bg-zinc-900
                                                rounded-3xl
                                                overflow-hidden
                                                border
                                                border-white/5
                                                hover:border-orange-500/30
                                                transition
                                                group
                                                "
                                            >

                                                {/* IMAGE */}
                                                <div className="overflow-hidden">

                                                    <img
                                                        src={item.p_img}
                                                        loading="lazy"
                                                        decoding="async"
                                                        alt={item.p_name}
                                                        onError={(e) => {
                                                            e.target.src = "/fallback.png";
                                                        }}
                                                        className="
                                                        h-[250px]
                                                        sm:h-[350px]
                                                        w-full
                                                        object-cover
                                                        group-hover:scale-110
                                                        transition
                                                        duration-500
                                                        "
                                                    />

                                                </div>

                                                {/* CONTENT */}
                                                <div className="p-4 sm:p-5">

                                                    {/* PRODUCT NAME */}
                                                    <h3 className="text-white text-lg sm:text-2xl font-bold">

                                                        {item.p_name}

                                                    </h3>

                                                    {/* DESCRIPTION */}
                                                    <p className="text-white/50 text-sm mt-2 line-clamp-2 min-h-[40px]">

                                                        {item.p_desc}

                                                    </p>

                                                    {/* QUANTITY */}
                                                    <div className="flex items-center gap-2 mt-3">

                                                        <FaSupple className="text-yellow-400" />

                                                        <span className="text-white/70">

                                                            {item.quantity} available

                                                        </span>

                                                    </div>

                                                    {/* SIZE */}
                                                    <div className="mt-2">

                                                        <span className="text-white/60 text-sm">

                                                            Size : {item.p_size}

                                                        </span>

                                                    </div>

                                                    {/* PRICE + BUTTON */}
                                                    <div className="flex items-center justify-between mt-5 gap-3">

                                                        <h4 className="text-white text-xl sm:text-2xl font-extrabold">

                                                            ₹{item.price}

                                                        </h4>

                                                        <button
                                                            disabled={loadingId === item._id}
                                                            onClick={() => sendData(item._id)}
                                                            className="
                                                            bg-orange-500
                                                            hover:bg-orange-600
                                                            text-white
                                                            text-xs
                                                            sm:text-sm
                                                            px-4
                                                            py-2
                                                            rounded-full
                                                            font-bold
                                                            transition

                                                            disabled:opacity-50
                                                            disabled:cursor-not-allowed
                                                            "
                                                        >

                                                            {
                                                                loadingId === item._id
                                                                    ? "adding"
                                                                    : "Add Cart"
                                                            }

                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        ))

                                    ) : (

                                        <p className="text-white/40">

                                            No products found.

                                        </p>

                                    )
                                }

                            </div>

                        </div>

                    );

                })
            }

        </div>

    );

}