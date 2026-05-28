import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

export default function Adds() {

    const navi = useNavigate()

    const [filecolor, setFilecolor] = useState(false)

    const [addposts, setAddposts] = useState({
        p_name: "",
        p_desc: "",
        price: "",
        quantity: "",
        p_size: "",
        p_type: "",
        p_img: null
    })

    const hdle = (e) => {

        const { name, value, files } = e.target

        if (name === "p_img") {

            setAddposts((prev) => ({
                ...prev,
                p_img: files[0]
            }))

            setFilecolor(true)

        } else {

            setAddposts((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const adding = async (e) => {

        e.preventDefault()

        const formdata = new FormData()

        formdata.append("p_name", addposts.p_name)
        formdata.append("p_desc", addposts.p_desc)
        formdata.append("price", addposts.price)
        formdata.append("quantity", addposts.quantity)
        formdata.append("p_size", addposts.p_size)
        formdata.append("p_type", addposts.p_type)
        formdata.append("p_img", addposts.p_img)

        try {

            const responses = await axios.post(
                `${import.meta.env.VITE_API_URL}/addproduct`,
                formdata,{
                    withCredentials:true
                }
            )

            if (responses.status === 200) {

                toast.success("Product added successfully")

                setAddposts({
                    p_name: "",
                    p_desc: "",
                    price: "",
                    quantity: "",
                    p_size: "",
                    p_type: "",
                    p_img: null
                })

                setFilecolor(false)

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }

        } catch (e) {

            console.error("error in react addpost ", e)

            toast.error("Failed to add product")
        }
    }

    return (
        <>
            <div
                className={`min-h-screen bg-gray-200 flex justify-center p-6 text-black ${filecolor ? "border border-green-500" : ""
                    }`}
            >

                <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-8">

                    <ToastContainer />

                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Add the products
                    </h1>

                    <form className="flex flex-col gap-6" onSubmit={adding}>

                        {/* IMAGE + DETAILS */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* Image upload */}
                            <label
                                className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl h-40 cursor-pointer hover:bg-gray-100 transition ${filecolor && "border border-green-500"
                                    }`}
                            >

                                <span className="text-gray-600 font-medium">
                                    {filecolor ? "uploaded" : "click to upload image"}
                                </span>

                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    name="p_img"
                                    onChange={hdle}
                                />

                            </label>

                            {/* Product Inputs */}
                            <div className="flex flex-col gap-4">

                                {/* Product Name */}
                                <div>

                                    <label className="font-semibold">
                                        Product name
                                    </label>

                                    <input
                                        type="text"
                                        name="p_name"
                                        className="w-full ring-1 ring-gray-300 rounded p-2 mt-1"
                                        placeholder="Enter product name"
                                        value={addposts.p_name}
                                        onChange={hdle}
                                    />

                                </div>

                                {/* Product Price */}
                                <div>

                                    <label className="font-semibold">
                                        Product price
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        className="w-full ring-1 ring-gray-300 rounded p-2 mt-1"
                                        placeholder="Enter product price"
                                        value={addposts.price}
                                        onChange={hdle}
                                    />

                                </div>

                                {/* Product Quantity */}
                                <div>

                                    <label className="font-semibold">
                                        Product quantity
                                    </label>

                                    <input
                                        type="number"
                                        name="quantity"
                                        className="w-full ring-1 ring-gray-300 rounded p-2 mt-1"
                                        placeholder="Enter quantity"
                                        value={addposts.quantity}
                                        onChange={hdle}
                                    />

                                </div>

                                {/* Product Size */}
                                <div>

                                    <label className="font-semibold">
                                        Product size
                                    </label>

                                    <select
                                        name="p_size"
                                        className="w-full ring-1 ring-gray-300 rounded p-2 mt-1"
                                        value={addposts.p_size}
                                        onChange={hdle}
                                    >

                                        <option value="">
                                            Select size
                                        </option>

                                        <option value="SM">
                                            SM
                                        </option>

                                        <option value="MD">
                                            MD
                                        </option>

                                        <option value="XL">
                                            XL
                                        </option>

                                        <option value="XXL">
                                            XXL
                                        </option>

                                    </select>

                                </div>

                                {/* Product Type */}
                                <div>

                                    <label className="font-semibold">
                                        Product type
                                    </label>

                                    <select
                                        name="p_type"
                                        className="w-full ring-1 ring-gray-300 rounded p-2 mt-1"
                                        value={addposts.p_type}
                                        onChange={hdle}
                                    >

                                        <option value="">
                                            Select product type
                                        </option>

                                        <option value="hoodie">
                                            Hoodie
                                        </option>

                                        <option value="tshirts">
                                            T-Shirts
                                        </option>

                                        <option value="sweater">
                                            Sweater
                                        </option>

                                        <option value="sneakers">
                                            Sneakers
                                        </option>

                                    </select>

                                </div>

                            </div>

                        </div>

                        {/* DESCRIPTION */}
                        <div className="flex flex-col gap-2">

                            <label className="font-semibold">
                                Product description
                            </label>

                            <textarea
                                name="p_desc"
                                placeholder="Write your description here...."
                                className="w-full min-h-[350px] ring-1 ring-gray-300 rounded p-4"
                                value={addposts.p_desc}
                                onChange={hdle}
                            />

                        </div>

                        {/* BUTTONS */}
                        <div className="flex justify-between mt-4">

                            <button
                                type="button"
                                onClick={() => navi("/")}
                                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                            >
                                Back
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Add to market
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </>
    )
}