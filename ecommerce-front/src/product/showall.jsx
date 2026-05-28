import React, { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import Nav from "../components/nav"
import { useNavigate } from "react-router-dom"

const Showall = () => {

    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [filtered, setFiltered] = useState([])
    const [loading, setLoading] = useState(true)

    // BUTTON LOADING
    const [loadingId, setLoadingId] = useState(null)

    const filters = [
        "all",
        "hoodie",
        "tshirt",
        "sweater",
        "sneker"
    ]

    // FETCH PRODUCTS
    useEffect(() => {

        fetchProducts()

    }, [])

    const fetchProducts = async () => {

        try {

            const res = await axios.get(
                `${BASE_URL}/getcart`, {
    credentials: "include"}
            )

            setProducts(res.data)

            setFiltered(res.data)

            

        } catch (error) {

            console.log(error)

            toast.error(
                "Failed to load products"
            )

        } finally {

            setLoading(false)

        }

    }

    // FILTER PRODUCTS
    const filterProducts = (type) => {

        if (type === "all") {

            setFiltered(products)

            return
        }

        const filteredData = products.filter(

            (item) => item.p_type === type

        )

        setFiltered(filteredData)


    }

    // ADD TO CART
    const sendData = async (id) => {

        // PREVENT SPAM CLICK
        if (loadingId === id) return

        try {

            setLoadingId(id)

            const response = await   fetch(`${BASE_URL}/addcart`, {

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
            )

            const datum = await response.json()

            console.log(datum)

            // SUCCESS
            if (datum.status) {

                toast.success("Added to cart")

            } else {

                toast.error("Login first")

            }

        } catch (e) {

            console.log(e)

            toast.error("Server error")

        } finally {

            setLoadingId(null)

        }

    }

    return (

        <>

            <Nav />

            <div className="min-h-screen bg-gray-300 p-6">

                <ToastContainer />

                {/* BACK BUTTON */}
                <button
                    onClick={() => {
                        navigate(-1)
                    }}
                    className="
                    font-bold
                    text-lg
                    border-2
                    rounded-lg
                    p-2
                    mb-5
                    hover:bg-black
                    hover:text-white
                    transition
                    "
                >

                    Back

                </button>

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-center mb-8">

                    All Products

                </h1>

                {/* FILTER BUTTONS */}
                <div
                    className="
                    flex
                    flex-wrap
                    justify-center
                    gap-4
                    mb-10
                    "
                >

                    {
                        filters?.map((item, index) => (

                            <button
                                key={index}

                                onClick={() =>
                                    filterProducts(item)
                                }

                                className="
                                bg-black
                                text-white
                                px-5
                                py-2
                                rounded-lg
                                hover:scale-105
                                transition
                                "
                            >

                                {item.toUpperCase()}

                            </button>

                        ))
                    }

                </div>

                {/* LOADING */}
                {
                    loading ? (

                        <div
                            className="
                            text-center
                            text-2xl
                            font-semibold
                            "
                        >

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
                                filtered?.map((product) => (

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

                                            {/* NAME */}
                                            <h2
                                                className="
                                                text-xl
                                                font-bold
                                                "
                                            >

                                                {product.p_name}

                                            </h2>

                                            {/* DESCRIPTION */}
                                            <p
                                                className="
                                                text-gray-600
                                                text-sm
                                                mt-2
                                                "
                                            >

                                                {product.p_desc}

                                            </p>

                                            {/* PRICE + SIZE */}
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

                                            {/* ADD TO CART */}
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

    )
}

export default Showall