import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

export default function Catalog() {
const BASE_URL = import.meta.env.VITE_API_URL;

    const { id } = useParams();

    const [datum, setDatum] = useState([]);
    const [loading, setLoading] = useState(true);

    // BUTTON LOADING
    const [loadingId, setLoadingId] = useState(null);

    const navigate = useNavigate();

    // FETCH CATEGORY PRODUCTS
    useEffect(() => {

        const catagories = async () => {

            try {

                const fetcher = await   fetch(`${BASE_URL}/cat/${id}`);


                const res = await fetcher.json();

                setDatum(res);

                setLoading(false);

            } catch (e) {

                console.log(
                    "there is an error in category " + e
                );

                toast.error("an error in catalog");

                setLoading(false);

            }

        };

        catagories();

    }, [id]);

    // ADD TO CART
    const sendData = async (productid) => {

        // prevent spam click
        if (loadingId === productid) return;

        try {

            setLoadingId(productid);

            const response = await   fetch(`${BASE_URL}/addcart`, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        productid,
                        quantity: 1
                    })

                }
            );

            const datum = await response.json();

            console.log(datum);

            // SUCCESS
            if (datum.status) {

                toast.success("Added to cart");

            } else {

                toast.error("Login first");

            }

        } catch (e) {

            console.log(e);

            toast.error("Server error");

        } finally {

            setLoadingId(null);

        }

    };

    return (

        <>

            <div className="min-h-screen bg-gray-100 p-6">

                <ToastContainer />

                {/* BACK BUTTON */}
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                    className="
                    flex
                    items-center
                    gap-2
                    font-bold
                    text-lg
                    border-2
                    rounded-lg
                    p-2
                    mb-6
                    "
                >

                    <FaArrowLeft />

                    Back

                </button>

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-center mb-8">

                    All Products of {id}

                </h1>

                {/* LOADING */}
                {
                    loading ? (

                        <div className="text-center text-2xl font-semibold">

                            Loading...

                        </div>

                    ) : (

                        <div
                            className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            gap-6
                            "
                        >

                            {
                                datum.map((product) => (

                                    <div
                                        key={product._id}
                                        className="
                                        bg-white
                                        rounded-2xl
                                        shadow-lg
                                        overflow-hidden
                                        hover:shadow-2xl
                                        transition
                                        "
                                    >

                                        {/* IMAGE */}
                                        <img
                                            src={product.p_img}
                                            alt={product.p_name}
                                            className="
                                            w-full
                                            h-64
                                            object-cover
                                            "
                                        />

                                        {/* CONTENT */}
                                        <div className="p-4">

                                            <h2 className="text-xl font-bold">

                                                {product.p_name}

                                            </h2>

                                            <p
                                                className="
                                                text-gray-600
                                                text-sm
                                                mt-2
                                                "
                                            >

                                                {product.p_desc}

                                            </p>

                                            {/* PRICE */}
                                            <div
                                                className="
                                                mt-4
                                                flex
                                                justify-between
                                                items-center
                                                "
                                            >

                                                <span
                                                    className="
                                                    text-lg
                                                    font-bold
                                                    text-green-600
                                                    "
                                                >

                                                    ₹{product.price}

                                                </span>

                                                <span
                                                    className="
                                                    bg-gray-200
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-sm
                                                    "
                                                >

                                                    {product.p_size}

                                                </span>

                                            </div>

                                            {/* BUTTON */}
                                            <button

                                                disabled={
                                                    loadingId === product._id
                                                }

                                                onClick={() =>
                                                    sendData(product._id)
                                                }

                                                className="
                                                w-full
                                                mt-5
                                                bg-black
                                                text-white
                                                py-2
                                                rounded-lg
                                                hover:bg-gray-800
                                                transition

                                                disabled:opacity-50
                                                disabled:cursor-not-allowed
                                                "
                                            >

                                                {
                                                    loadingId === product._id
                                                        ? "Adding..."
                                                        : "Add to Cart"
                                                }

                                            </button>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                    )
                }

            </div>

        </>

    );
}