import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { useCart } from "../cartcontext"

export default function Productcard() {
    const {fetchCart} = useCart();
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [quantities , setQuantities]  = useState(null)

     //clicks
     const clicks =()=>{
        setSelectedProduct(null)
        setQuantities(null)
     }
    // FETCH PRODUCTS
    useEffect(() => {

        const fetchdata = async () => {

            try {

                const data = await fetch("http://localhost:5000/product")

                const datum = await data.json()

                setProducts(datum)

            } catch (e) {

                console.log(e)
            }
        }

        fetchdata()

    }, [products])

    // ADD TO CART
    const sendData = async (id) => {

        try {

            const response = await fetch("http://localhost:5000/addcart", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    productid: id,
                    quantity: 1
                })

            })

            const datum = await response.json()
            setQuantities(datum.quant)
            console.log(datum)
            if(datum.status){
                toast.success("added to cart")
            
            }
            else{
                toast.error("login first")
            }


        } catch (e) {

            console.log(e)
        }
    }

    return (
        <>


            {/* PRODUCT SECTION */}
            <div className="mt-16 md:mt-20 px-4 sm:px-6 md:px-8 overflow-hidden">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 md:mb-10">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/80 leading-tight">

                        Trending Products

                    </h1>
                    <Link to="/showall">
                    <button className="w-fit text-sm sm:text-base text-white/70 hover:text-white transition">

                        View All →

                    </button></Link>

                </div>

                {/* PRODUCT SCROLL */}
                <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-5 snap-x snap-mandatory scroll-smooth">

                    {
                        products.map((keys) => (

                            <div
                                key={keys._id}
                                onClick={() => setSelectedProduct(keys)}
                                className="
                                group
                                cursor-pointer
                                min-w-[260px]
                                sm:min-w-[300px]
                                md:min-w-[320px]
                                max-w-[260px]
                                sm:max-w-[300px]
                                md:max-w-[320px]
                                bg-white/10
                                backdrop-blur-lg
                                rounded-3xl
                                p-3
                                sm:p-4
                                transition-all
                                duration-500
                                shadow-2xl
                                border
                                border-white/10
                                flex-shrink-0
                                snap-center
                                perspective-[2000px]
                                hover:shadow-orange-500/30
                                "
                            >

                                <div
                                    className="
                                    preserve-3d
                                    transition-all
                                    duration-500
                                    md:group-hover:rotate-y-[-14deg]
                                    md:group-hover:rotate-x-[6deg]
                                    md:group-hover:-translate-y-2
                                    active:rotate-y-[-10deg]
                                    active:rotate-x-[4deg]
                                    "
                                >

                                    {/* PRODUCT IMAGE */}
                                    <div className="overflow-hidden rounded-2xl relative">

                                        {/* GLOW */}
                                        <div className="
                                        absolute
                                        inset-0
                                        bg-orange-500/20
                                        blur-2xl
                                        opacity-0
                                        group-hover:opacity-100
                                        transition
                                        duration-500
                                        " />

                                        <img
                                            src={keys.p_img}
                                            alt="product"
                                            className="
                                            relative
                                            h-[180px]
                                            sm:h-[220px]
                                            md:h-[250px]
                                            w-full
                                            object-cover
                                            rounded-2xl
                                            transition-all
                                            duration-700
                                            md:group-hover:scale-110
                                            "
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

                                        {/* DESCRIPTION */}
                                        <p className="text-sm sm:text-base text-white/70 mt-3 leading-relaxed line-clamp-2">

                                            {keys.p_desc}

                                        </p>

                                        {/* EXTRA DETAILS */}
                                        <div className="flex flex-wrap gap-2 mt-4">

                                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">

                                                Size: {keys.p_size || "N/A"}

                                            </span>

                                            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">

                                                Stock: {keys.quantity || 0}

                                            </span>

                                        </div>

                                        {/* PRICE */}
                                        <div className="flex justify-between items-center mt-5 sm:mt-6 gap-3">

                                            <span className="text-2xl sm:text-3xl font-extrabold text-yellow-200">

                                                ₹{keys.price}

                                            </span>
                                            <span>
                                                <button
                                                className=" text-lg  sm:text-xl font-bold text-white p-2 rounded bg-orange-600 active:bg-orange-600"
>                                                   Add to cart

                                                </button>
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

          {/* PRODUCT MODAL */}
{
    selectedProduct && (

        <div
            className="
            fixed
            inset-0
            z-50
            bg-black/90
            backdrop-blur-xl
            overflow-y-auto
            px-3
            sm:px-6
            py-3
            sm:py-6
            flex
            items-start
            sm:items-center
            justify-center
            "
        >

            {/* MODAL BOX */}
            <div
                className="
                relative
                w-full
                max-w-6xl
                rounded-[28px]
                overflow-hidden
                border
                border-white/10
                bg-zinc-950
                shadow-[0_20px_120px_rgba(0,0,0,0.9)]
                min-h-fit
                "
            >

                {/* CLOSE BUTTON */}
                <button
                    onClick={()=>clicks()}
                    className="
                    absolute
                    top-3
                    right-3
                    z-50
                    h-11
                    w-11
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-black/40
                    backdrop-blur-xl
                    border
                    border-white/10
                    text-white
                    text-2xl
                    hover:bg-red-500
                    transition-all
                    "
                >
                    ×
                </button>

                {/* GRID */}
                <div
                    className="
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    "
                >

                    {/* LEFT SIDE IMAGE */}
                    <div
                        className="
                        relative
                        flex
                        items-center
                        justify-center
                        bg-gradient-to-br
                        from-zinc-900
                        via-black
                        to-zinc-800
                        p-2
                        overflow-hidden
                        min-h-[220px]
                        sm:min-h-[320px]
                        md:min-h-[500px]
                        "
                    >

                        {/* BIG GLOW */}
                        <div
                            className="
                            absolute
                            w-[300px]
                            h-[300px]
                            md:w-[400px]
                            md:h-[400px]
                            bg-orange-500/20
                            blur-[120px]
                            rounded-full
                            "
                        />

                        {/* EXTRA GLOW */}
                        <div
                            className="
                            absolute
                            w-[220px]
                            h-[220px]
                            md:w-[500px]
                            md:h-[500px]
                            bg-orange-400/30
                            blur-[140px]
                            rounded-full
                            animate-pulse
                            "
                        />

                        {/* IMAGE HOLDER */}
                        <div
                            className="
                            group
                            relative
                            perspective-[2100px]
                            flex
                            items-center
                            justify-center
                            "
                        >

                            <div
                                className="
                                preserve-3d
                                transition-all
                                duration-700
                                ease-out
                                md:group-hover:rotate-y-[-22deg]
                                md:group-hover:rotate-x-[10deg]
                                md:group-hover:-translate-y-4
                                md:group-hover:translate-x-[-25px]
                                "
                            >

                                {/* SHADOW */}
                                <div
                                    className="
                                    absolute
                                    inset-0
                                    bg-black/50
                                    blur-3xl
                                    scale-75
                                    translate-y-16
                                    rounded-full
                                    "
                                />

                                {/* PRODUCT IMAGE */}
                                <img
                                    src={selectedProduct.p_img}
                                    alt="product"
                                    className="
                                    relative
                                    z-10
                                    w-full

                                    max-w-[220px]
                                    sm:max-w-[350px]
                                    md:max-w-[520px]

                                    max-h-[220px]
                                    sm:max-h-[420px]
                                    md:max-h-[650px]

                                    object-contain

                                    transition-all
                                    duration-700

                                    md:group-hover:scale-110
                                    md:group-hover:-translate-y-4

                                    drop-shadow-[0_40px_100px_rgba(255,140,0,0.45)]
                                    "
                                />

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE DETAILS */}
                    <div
                        className="
                        p-5
                        sm:p-7
                        md:p-10
                        flex
                        flex-col
                        justify-between
                        "
                    >

                        <div>

                            

                            {/* PRODUCT NAME */}
                            <h1
                                className="
                                text-2xl
                                sm:text-4xl
                                md:text-5xl
                                font-bold
                                text-white
                                leading-tight
                                "
                            >

                                {selectedProduct.p_name}

                            </h1>

                            {/* PRODUCT TYPE */}
                            <p
                                className="
                                text-yellow-300
                                uppercase
                                tracking-[4px]
                                mt-4
                                text-xs
                                sm:text-sm
                                "
                            >

                                {selectedProduct.p_type}

                            </p>

                            {/* DESCRIPTION */}
                            <p
                                className="
                                text-white/70
                                mt-6
                                text-sm
                                sm:text-base
                                leading-relaxed
                                "
                            >

                                {selectedProduct.p_desc}

                            </p>

                            {/* INFO */}
                            <div className="flex gap-3 mt-8 flex-wrap">

                                <span
                                    className="
                                    bg-blue-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded-full
                                    text-sm
                                    font-bold
                                    "
                                >

                                    Size: {selectedProduct.p_size || "N/A"}

                                </span>

                                <span
                                    className="
                                    bg-green-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded-full
                                    text-sm
                                    font-bold
                                    "
                                >

                                    Stock: {quantities ? quantities :selectedProduct.quantity  || 0}

                                </span>

                            </div>

                            {/* PRICE */}
                            <div className="mt-10">

                                <span
                                    className="
                                    text-4xl
                                    sm:text-5xl
                                    font-extrabold
                                    text-yellow-300
                                    "
                                >

                                    ₹{selectedProduct.price}

                                </span>

                            </div>

                        </div>

                        {/* BUTTON */}
                        <div className="mt-10">

                            <button
                                onClick={() => sendData(selectedProduct._id)}
                                className="
                                w-full
                                bg-orange-500
                                hover:bg-orange-400
                                text-white
                                py-3.5
                                rounded-2xl
                                text-base
                                sm:text-lg
                                font-bold
                                transition-all
                                duration-300
                                hover:scale-[1.02]
                                shadow-lg
                                "
                            >

                                Add Product To Cart

                            </button>
                        <ToastContainer />
                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}

        </>
    )
}