import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { FaMapMarkerAlt, FaCreditCard } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Checkout = () => {
    const navi = useNavigate();

    const [address, setAddress] = useState("")
    const [paymentmethod, setPaymentmethod] = useState("COD")
    const [message, setMessage] = useState("")

    const handleCheckout = async (e) => {

        e.preventDefault()

        try {

            const response = await fetch(`${BASE_URL}/checkout`, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        address,
                        paymentmethod
                    })
                }
            )

            const data = await response.json()

            console.log(data)


            toast.success("Order Placed Successfully!")

            navi(`/showbill/${data._id}`)



        } catch (error) {

            console.log(error)

            setMessage("Checkout failed")

            toast.error("Checkout Failed")

        }
    }

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-5">

            <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

                <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">
                    Checkout
                </h1>

                <form
                    onSubmit={handleCheckout}
                    className="space-y-6"
                >

                    <div>

                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <FaMapMarkerAlt />
                            Delivery Address
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />

                    </div>

                    <div>

                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <FaCreditCard />
                            Payment Method
                        </label>

                        <select
                            value={paymentmethod}
                            onChange={(e) =>
                                setPaymentmethod(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                        >

                            <option value="COD">
                                Cash On Delivery
                            </option>

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="CARD">
                                Card
                            </option>

                        </select>

                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-md hover:shadow-xl"
                    >
                        Place Order
                    </button>

                </form>

                {
                    message && (
                        <p className="text-center mt-5 text-gray-700 font-medium">
                            {message}
                        </p>
                    )
                }

            </div>

            <ToastContainer />

        </div>
    )
}

export default Checkout