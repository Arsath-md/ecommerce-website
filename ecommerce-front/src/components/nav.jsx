import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    FaShoppingCart,
    FaUser,
    FaBars,
    FaTimes
} from "react-icons/fa";

export default function Nav() {

    const BASE_URL = import.meta.env.VITE_API_URL;

    const [menuOpen, setMenuOpen] = useState(false);
    const [cart, setCart] = useState(false);
    const [additem, setAdditem] = useState([]);
    const [loading, setLoading] = useState(true);

    // FETCH CART
    const fetchCart = async () => {
        try {

            setLoading(true);

            const res = await fetch(`${BASE_URL}/getcart`, {
                credentials: "include"
            });

            const data = await res.json();

            setAdditem(data);

        } catch (e) {

            console.log("error in cart " + e);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // DELETE CART ITEM
    const deletecart = async (productid) => {
        try {

            await fetch(`${BASE_URL}/cartdelete/${productid}`, {
                method: "DELETE",
                credentials: "include"
            });

            setAdditem(prev => ({
                ...prev,
                producting: prev.producting.filter(
                    item => item.productid._id !== productid
                )
            }));

        } catch (e) {

            console.log(e);

        }
    };

    // LOCK SCROLL
    useEffect(() => {

        document.body.style.overflow =
            cart || menuOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };

    }, [cart, menuOpen]);

    // TOTAL
    const total = additem?.producting?.reduce(
        (t, i) => t + (i?.productid?.price * i?.quantity),
        0
    );

    return (
        <>

            {/* NAVBAR */}
            <div className="fixed top-0 left-0 w-full z-50 px-3 pt-4">

                <div className="max-w-7xl mx-auto">

                    <div className="h-[72px] px-5 md:px-8 rounded-2xl md:rounded-full bg-zinc-900/90 backdrop-blur-xl border border-white/10 shadow-xl text-white">

                        <div className="flex items-center justify-between h-full">

                            {/* LOGO */}
                            <Link
                                to="/"
                                className="flex items-center gap-3"
                            >

                                <img
                                    src="/joe.jpeg"
                                    alt="logo"
                                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                                />

                                <h1 className="text-lg font-bold tracking-widest">
                                    JOE
                                </h1>

                            </Link>

                            {/* DESKTOP MENU */}
                            <div className="hidden md:flex">

                                <ul className="flex items-center gap-10 text-sm font-medium tracking-wide">

                                    <li>
                                        <Link
                                            to="/cat/tshirt"
                                            className="hover:text-orange-400 transition-colors duration-200"
                                        >
                                            T-shirts
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to="/cat/hoodie"
                                            className="hover:text-orange-400 transition-colors duration-200"
                                        >
                                            Hoodies
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to="/cat/sweater"
                                            className="hover:text-orange-400 transition-colors duration-200"
                                        >
                                            Sweaters
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to="/cat/sneker"
                                            className="hover:text-orange-400 transition-colors duration-200"
                                        >
                                            Sneakers
                                        </Link>
                                    </li>

                                </ul>

                            </div>

                            {/* DESKTOP BUTTONS */}
                            <div className="hidden md:flex items-center gap-4">

                                {/* CART */}
                                <button
                                    onClick={() => setCart(true)}
                                    className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-full font-medium"
                                >

                                    <FaShoppingCart />

                                    <span>
                                        Cart
                                    </span>

                                    <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">

                                        {additem?.producting?.length || 0}

                                    </span>

                                </button>

                                {/* LOGIN */}
                                <Link to="/login">

                                    <button className="flex items-center gap-2 border border-white/20 hover:bg-white hover:text-black transition px-5 py-2 rounded-full font-medium">

                                        <FaUser />

                                        <span>
                                            Login
                                        </span>

                                    </button>

                                </Link>

                            </div>

                            {/* MOBILE ACTIONS */}
                            <div className="flex items-center gap-4 md:hidden">

                                {/* MOBILE CART */}
                                <button
                                    onClick={() => setCart(true)}
                                    className="relative text-xl"
                                >

                                    <FaShoppingCart />

                                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">

                                        {additem?.producting?.length || 0}

                                    </span>

                                </button>

                                {/* MENU BUTTON */}
                                <button
                                    className="text-2xl"
                                    onClick={() => setMenuOpen(true)}
                                >
                                    <FaBars />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* MOBILE MENU */}
            <div className={`fixed inset-0 bg-black z-[60] text-white transition-all duration-300 ${
                menuOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
            }`}>

                {/* TOP */}
                <div className="flex items-center justify-between p-5 border-b border-white/10">

                    <h2 className="text-xl font-semibold">
                        Menu
                    </h2>

                    <button
                        onClick={() => setMenuOpen(false)}
                        className="text-2xl"
                    >
                        <FaTimes />
                    </button>

                </div>

                {/* MENU LINKS */}
                <ul className="flex flex-col text-lg font-medium p-5">

                    <li className="border-b border-white/10 py-5">

                        <Link
                            to="/cat/tshirt"
                            onClick={() => setMenuOpen(false)}
                        >
                            T-shirts
                        </Link>

                    </li>

                    <li className="border-b border-white/10 py-5">

                        <Link
                            to="/cat/hoodie"
                            onClick={() => setMenuOpen(false)}
                        >
                            Hoodies
                        </Link>

                    </li>

                    <li className="border-b border-white/10 py-5">

                        <Link
                            to="/cat/sweater"
                            onClick={() => setMenuOpen(false)}
                        >
                            Sweaters
                        </Link>

                    </li>

                    <li className="border-b border-white/10 py-5">

                        <Link
                            to="/cat/sneker"
                            onClick={() => setMenuOpen(false)}
                        >
                            Sneakers
                        </Link>

                    </li>

                    {/* MOBILE CART */}
                    <li className="border-b border-white/10 py-5">

                        <button
                            onClick={() => {
                                setCart(true);
                                setMenuOpen(false);
                            }}
                        >
                            Cart
                        </button>

                    </li>

                    {/* LOGIN */}
                    <li className="py-5">

                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                        >
                            Login
                        </Link>

                    </li>

                </ul>

            </div>

            {/* OVERLAY */}
            <div
                className={`fixed inset-0 bg-black/60 z-40 transition-all duration-300 ${
                    cart
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                }`}
                onClick={() => setCart(false)}
            />

            {/* CART SIDEBAR */}
            <div className={`fixed top-0 right-0 h-screen w-full max-w-[400px] bg-zinc-950 border-l border-white/10 text-white z-50 transition-transform duration-300 ${
                cart
                    ? "translate-x-0"
                    : "translate-x-full"
            }`}>

                {/* CART TOP */}
                <div className="flex items-center justify-between p-5 border-b border-white/10">

                    <h2 className="text-xl font-semibold">
                        Your Cart
                    </h2>

                    <button
                        onClick={() => setCart(false)}
                        className="text-2xl"
                    >
                        <FaTimes />
                    </button>

                </div>

                {/* CART ITEMS */}
                <div className="p-5 flex flex-col gap-4 overflow-y-auto h-[calc(100%-170px)]">

                    {loading ? (

                        <p>Loading...</p>

                    ) : additem?.producting?.length > 0 ? (

                        additem.producting.map(item => (

                            <div
                                key={item.productid._id}
                                className="relative flex gap-4 bg-white/5 hover:bg-white/10 transition p-4 rounded-2xl border border-white/5"
                            >

                                {/* DELETE */}
                                <button
                                    onClick={() => deletecart(item.productid._id)}
                                    className="absolute top-2 right-3 text-red-500 text-lg"
                                >
                                    ×
                                </button>

                                {/* IMAGE */}
                                <img
                                    src={item.productid.p_img}
                                    alt={item.productid.p_name}
                                    className="w-20 h-20 rounded-xl object-cover"
                                />

                                {/* INFO */}
                                <div className="flex flex-col justify-center">

                                    <h3 className="font-semibold">
                                        {item.productid.p_name}
                                    </h3>

                                    <p className="text-orange-400 font-medium">
                                        ₹{item.productid.price}
                                    </p>

                                    <p className="text-sm text-zinc-400">
                                        Qty: {item.quantity}
                                    </p>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="flex items-center justify-center h-full text-zinc-400">

                            Your cart is empty

                        </div>

                    )}

                </div>

                {/* CART BOTTOM */}
                <div className="absolute bottom-0 left-0 w-full p-5 border-t border-white/10 bg-zinc-950">

                    <div className="flex items-center justify-between mb-4">

                        <h2 className="text-lg font-semibold">
                            Total
                        </h2>

                        <span className="text-xl font-bold text-orange-400">
                            ₹{total || 0}
                        </span>

                    </div>

                    <Link to="/cart">

                        <button className="w-full bg-orange-500 hover:bg-orange-600 transition py-3 rounded-xl font-semibold">

                            View Cart

                        </button>

                    </Link>

                </div>

            </div>

        </>
    );
}