import { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"

export default function Views() {

    const [products, setProducts] = useState([])

    // DELETE PRODUCT
    const handleDelete = async (id) => {

        try {

            await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
                method: "DELETE",
                credentials:"include"
            })

            setProducts(products.filter((item) => item._id !== id))

            toast.error("Product deleted")

        } catch (e) {

            console.log(e)
        }
    }

    // FETCH PRODUCTS
    useEffect(() => {

        const fetchdata = async () => {

            try {

                const data = await fetch("http://localhost:5000/product",{
                    credentials:"include"
                })

                const datum = await data.json()

                setProducts(datum)

            } catch (e) {

                console.log(e)
            }
        }

        fetchdata()

    }, [])

    return (
        <>

            {/* PRODUCT SECTION */}
            <div className="mt-16 md:mt-20 px-4 sm:px-6 md:px-8">

                {/* HEADER */}
                <ToastContainer />

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 md:mb-10">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/80 leading-tight">

                        Your products

                    </h1>

                </div>

                {/* PRODUCT LIST */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 p-3">

                    {
                        products.map((keys) => (

                            <div
                                key={keys._id}
                                className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px] max-w-[260px] sm:max-w-[300px] md:max-w-[320px] bg-white/10 backdrop-blur-lg rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/10 flex-shrink-0"
                            >

                                {/* PRODUCT IMAGE */}
                                <div className="overflow-hidden rounded-2xl">

                                    <img
                                        src={`${keys.p_img}`}
                                        alt="product"
                                        className="h-[180px] sm:h-[220px] md:h-[250px] w-full object-cover hover:scale-110 transition duration-500"
                                    />

                                </div>

                                {/* PRODUCT DETAILS */}
                                <div className="mt-4 sm:mt-5">

                                    {/* PRODUCT NAME */}
                                    <h2 className="text-xl sm:text-2xl font-bold text-white line-clamp-1">

                                        {keys.p_name}

                                    </h2>

                                    {/* PRODUCT TYPE */}
                                    <p className="text-sm text-yellow-300 mt-1 uppercase tracking-wider">

                                        {keys.p_type}

                                    </p>

                                    {/* PRODUCT DESCRIPTION */}
                                    <p className="text-sm sm:text-base text-white/70 mt-3 leading-relaxed line-clamp-2">

                                        {keys.p_desc}

                                    </p>

                                    {/* EXTRA DETAILS */}
                                    <div className="flex flex-wrap gap-2 mt-4">

                                        {/* PRODUCT SIZE */}
                                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">

                                            Size: {keys.p_size || "N/A"}

                                        </span>

                                        {/* PRODUCT QUANTITY */}
                                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">

                                            Qty: {keys.quantity || 0}

                                        </span>

                                    </div>

                                    {/* PRODUCT PRICE */}
                                    <div className="mt-4">

                                        <span className="text-2xl sm:text-3xl font-extrabold text-yellow-200">

                                            ₹{keys.price}

                                        </span>

                                    </div>

                                    {/* BUTTONS */}
                                    <div className="flex justify-between items-center mt-5 sm:mt-6 gap-3">

                                        {/* UPDATE BUTTON */}
                                        <button className="bg-yellow-600 text-white px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base font-bold hover:bg-yellow-900 transition duration-300 shadow-lg whitespace-nowrap">

                                            Update

                                        </button>

                                        {/* DELETE BUTTON */}
                                        <button
                                            className="bg-red-600 text-white px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base font-bold hover:bg-red-900 transition duration-300 shadow-lg whitespace-nowrap"
                                            onClick={() => handleDelete(keys._id)}
                                        >

                                            Delete

                                        </button>

                                    </div>

                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>

        </>
    )
}