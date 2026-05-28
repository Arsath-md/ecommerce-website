import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";


export default function Login() {
    const BASE_URL = import.meta.env.VITE_API_URL;

    const navi = useNavigate();

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

        const datam = await   fetch(`${BASE_URL}/log`, {

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
        toast.success("loggined")
        navi("/")

    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <form
                onSubmit={hdlesbt}
                className="bg-white shadow-2xl rounded-2xl p-10 w-[400px] flex flex-col gap-6"
            >

                <div className="text-center">

                    <h1 className="text-4xl font-bold text-gray-800">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to continue
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
                        className="border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
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
                        className="border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
                    />

                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300"
                >
                    Login
                </button>

                <p className="text-center text-gray-500 text-sm">
                    Don't have an account?
                   <Link to="/register">register</Link>
                </p>

            </form>
                <ToastContainer/>
        </div>
    );
}