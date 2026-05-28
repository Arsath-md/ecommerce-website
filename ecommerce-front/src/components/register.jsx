import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";

export default function Register() {
const BASE_URL = import.meta.env.VITE_API_URL;

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const hdle = (e) => {

        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        });
    };

    const hdlesbt = async (e) => {

        e.preventDefault();

        const datam = await   fetch(`${BASE_URL}/sign`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        });

        const result = await datam.json();

        console.log(result);
        toast.success("success !")
        setData("")
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <form
                onSubmit={hdlesbt}
                className="bg-white shadow-2xl rounded-2xl p-10 w-[400px] flex flex-col gap-6"
            >

                <div className="text-center">

                    <h1 className="text-4xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Register to get started
                    </p>

                </div>

                <div className="flex flex-col gap-2">

                    <label className="text-gray-700 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={data.email}
                        onChange={hdle}
                        className="border border-gray-300 p-3 rounded-lg outline-none focus:border-green-500"
                    />

                </div>

                <div className="flex flex-col gap-2">

                    <label className="text-gray-700 font-medium">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={data.password}
                        onChange={hdle}
                        className="border border-gray-300 p-3 rounded-lg outline-none focus:border-green-500"
                    />

                </div>

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition duration-300"
                >
                    Register
                </button>

                <p className="text-center text-gray-500 text-sm">
                    Already have an account?
                    <Link to="/login">Login</Link>
                </p>
                <ToastContainer/>

            </form>

        </div>
    );
}