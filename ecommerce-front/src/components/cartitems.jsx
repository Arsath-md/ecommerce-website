import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa"

const CartItems = () => {
    const [msg,setMsg] = useState(null)
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchCart = async () => {

            try {

                const response = await fetch("http://localhost:5000/getcart", {
                    credentials: "include"
                })

                const data = await response.json()
                console.log(data.status)
                if(data.status){
                    setMsg(data.msg)
                }
                setMsg(null)
                setCart(data)

            } catch (error) {

                console.log("Error fetching cart:", error)

            } finally {

                setLoading(false)

            }
        }

        fetchCart()

    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-3xl font-bold text-orange-500 animate-pulse">
                    Loading...
                </h1>
            </div>
        )
    }

    if (!cart || cart.producting.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <FaShoppingCart className="text-7xl text-gray-400 mb-4" />

                <h1 className="text-3xl font-bold text-gray-700">
                    { msg ? msg : " Your Cart is Empty..."}
                </h1>

                <Link
                    to="/"
                    className="mt-5 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition"
                >
                    Continue Shopping
                </Link>
            </div>
        )
    }

    const totalPrice = cart.producting.reduce(
        (acc, item) =>
            acc + item.productid?.price * item.quantity,
        0
    )

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl font-bold text-center text-orange-500 mb-10">
                    Shopping Cart
                </h1>

                <div className="space-y-6">

                    {
                        cart.producting.map((item) => (

                            <div
                                key={item._id}
                                className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center hover:shadow-xl transition"
                            >

                                <div>

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {item.productid?.p_name}
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        Price: ₹{item.productid?.price}
                                    </p>

                                    <p className="text-gray-500">
                                        Quantity: {item.quantity}
                                    </p>

                                </div>

                                <div>

                                    <p className="text-xl font-bold text-orange-500">
                                        ₹{item.productid?.price * item.quantity}
                                    </p>

                                </div>

                            </div>
                        ))
                    }

                </div>

                <div className="bg-white mt-10 p-6 rounded-2xl shadow-md flex justify-between items-center">

                    <h2 className="text-2xl font-bold text-gray-800">
                        Total: ₹{totalPrice}
                    </h2>

                    <Link
                        to="/checkout"
                        className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg hover:bg-orange-600 transition"
                    >
                        Checkout
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default CartItems