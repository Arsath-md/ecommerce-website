import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    FaShoppingCart,
    FaUser,
    FaBars,
    FaTimes
} from "react-icons/fa";
import { useCart } from "../cartcontext";

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cart, setCart] = useState(false);
    const [additem, setAdditem] = useState([]);
    const [loading, setLoading] = useState(true);

    // FETCH CART ITEMS
    const fetchCart = async () => {

        try {

            setLoading(true);

            const fetching = await   fetch(`${BASE_URL}/getcart`, {

                    credentials: "include"
                }
            );

            const res = await fetching.json();

            setAdditem(res);
            

        } 

        catch (e) {

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

            await  fetch(`${BASE_URL}/cartdelete/${productid}`, {

                    method: "DELETE",
                    credentials: "include"
                }
            );

            // UPDATE UI
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

    // LOCK BODY SCROLL
    useEffect(() => {

        if (cart) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "auto";

        }

        return () => {

            document.body.style.overflow = "auto";

        };

    }, [cart]);

    // TOTAL
    const total = additem?.producting?.reduce(

        (totals, adder) =>

            totals +
            (
                adder?.productid?.price *
                adder?.quantity
            ),

        0
    );

    return (
        <>

            {/* NAVBAR */}
            <div
                className="
                relative
                pt-5
                px-3
                sm:px-5
                w-full
                overflow-hidden
                z-50
                bg-black/20
                "
            >

                <div
                    className="
                    w-full
                    rounded-2xl
                    md:rounded-full
                    px-4
                    py-4
                    md:px-6
                    font-bold
                    bg-black/50
                    backdrop-blur-xl
                    text-white
                    shadow-lg
                    border
                    border-white/10
                    "
                >

                    {/* TOP */}
                    <div className="flex items-center justify-between">

                        {/* LOGO */}
                        <div className="flex items-center gap-3">

                            <img
                                src="/joe.jpeg"
                                alt="Logo"
                                className="
                                h-10
                                w-10
                                md:h-12
                                md:w-12
                                object-cover
                                rounded-full
                                border-2
                                border-white/40
                                "
                            />

                            <h1 className="text-lg md:text-xl tracking-wide">
                                JOE
                            </h1>

                        </div>

                        {/* DESKTOP NAV */}
                        <div className="hidden md:block">

                            <ul className="flex gap-8">

                                <li>
                                    <Link to={`/cat/tshirt`}>
                                        T-shirts
                                    </Link>
                                </li>

                                <li>
                                    <Link to={`/cat/hoodie`}>
                                        Hoodies
                                    </Link>
                                </li>

                                <li>
                                    <Link to={`/cat/sweater`}>
                                        Sweaters
                                    </Link>
                                </li>

                                <li>
                                    <Link to={`/cat/sneker`}>
                                        Sneakers
                                    </Link>
                                </li>

                            </ul>

                        </div>

                        {/* BUTTONS */}
                        <div className="hidden md:flex gap-4">

                            <button
                                onClick={() => setCart(true)}
                                className="
                                relative
                                flex
                                items-center
                                gap-2
                                bg-orange-500
                                px-5
                                py-2
                                rounded-full
                                text-white
                                "
                            >

                                <FaShoppingCart />

                                Cart

                                {/* COUNT */}
                                <span
                                    className="
                                    absolute
                                    -top-2
                                    -right-2
                                    bg-white
                                    text-black
                                    text-xs
                                    h-5
                                    w-5
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    "
                                >

                                    {
                                        additem?.producting?.length || 0
                                    }

                                </span>

                            </button>

                            <Link to="/login">

                                <button
                                    className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-orange-500
                                    px-5
                                    py-2
                                    rounded-full
                                    text-white
                                    "
                                >

                                    <FaUser />

                                    Login

                                </button>

                            </Link>

                        </div>

                        {/* MOBILE MENU */}
                        <button
                            className="md:hidden text-2xl"
                            onClick={() =>
                                setMenuOpen(!menuOpen)
                            }
                        >

                            {
                                menuOpen
                                    ? <FaTimes />
                                    : <FaBars />
                            }

                        </button>

                    </div>

                </div>

            </div>

            {/* OVERLAY */}
            <div
                className={`
                fixed
                inset-0
                bg-black/60
                z-40
                transition-opacity
                duration-300
                ${
                    cart
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                }
                `}
                onClick={() => setCart(false)}
            />

            {/* SIDE CART */}
            <div
                className={`
                fixed
                top-0
                right-0
                h-screen
                w-[85%]
                sm:w-[380px]
                bg-zinc-950
                text-white
                z-50
                shadow-2xl
                transform
                transition-transform
                duration-300
                flex
                flex-col
                border-l
                border-white/10
                ${
                    cart
                        ? "translate-x-0"
                        : "translate-x-full"
                }
                `}
            >

                {/* HEADER */}
                <div
                    className="
                    flex
                    items-center
                    justify-between
                    p-5
                    border-b
                    border-white/10
                    "
                >

                    <h2 className="text-2xl font-bold">
                        Your Cart
                    </h2>

                    <button
                        onClick={() => setCart(false)}
                        className="
                        h-10
                        w-10
                        rounded-full
                        bg-white/10
                        flex
                        items-center
                        justify-center
                        "
                    >

                        <FaTimes />

                    </button>

                </div>

                {/* CART ITEMS */}
                <div
                    className="
                    flex-1
                    overflow-y-auto
                    p-5
                    flex
                    flex-col
                    gap-5
                    "
                >

                    {
                        loading ? (

                            <p>Loading...</p>

                        ) : additem?.producting?.length > 0 ? (

                            additem.producting.map((item) => (

                                <div
                                    key={item?.productid?._id}
                                    className="
                                    relative
                                    flex
                                    gap-4
                                    items-center
                                    bg-white/5
                                    border
                                    border-white/10
                                    rounded-2xl
                                    p-3
                                    "
                                >

                                    {/* X BUTTON */}
                                    <button

                                        onClick={() =>
                                            deletecart(
                                                item.productid._id
                                            )
                                        }

                                        className="
                                        absolute
                                        top-2
                                        right-2
                                        h-7
                                        w-7
                                        rounded-full
                                        bg-red-500
                                        hover:bg-red-600
                                        flex
                                        items-center
                                        justify-center
                                        text-white
                                        text-sm
                                        transition
                                        "
                                    >

                                        ×

                                    </button>

                                    {/* IMAGE */}
                                    <img
                                        src={item.productid?.p_img}
                                        alt={item.productid?.p_name}
                                        className="
                                        w-20
                                        h-20
                                        object-cover
                                        rounded-xl
                                        "
                                    />

                                    {/* DETAILS */}
                                    <div className="flex-1">

                                        <h3 className="font-bold text-sm">

                                            {item.productid?.p_name}

                                        </h3>

                                        <p className="text-orange-400 mt-1">

                                            ₹{item.productid?.price}

                                        </p>

                                        <p className="text-white/50 text-sm mt-1">

                                            Qty : {item.quantity}

                                        </p>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div
                                className="
                                flex
                                items-center
                                justify-center
                                h-full
                                text-zinc-500
                                "
                            >

                                Your cart is empty

                            </div>

                        )
                    }

                </div>

                {/* FOOTER */}
                <div
                    className="
                    p-5
                    border-t
                    border-white/10
                    "
                >

                    <div className="flex justify-between mb-4">

                        <p>Total</p>

                        <p className="font-bold text-2xl text-orange-400">

                            ₹{total || 0}

                        </p>

                    </div>

                    <Link to="/cart">

                        <button
                            className="
                            w-full
                            bg-orange-500
                            text-white
                            py-3
                            rounded-2xl
                            font-bold
                            "
                        >

                            View Cart

                        </button>

                    </Link>

                </div>

            </div>

        </>
    );
}