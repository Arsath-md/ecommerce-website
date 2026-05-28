import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [additem, setAdditem] = useState([]);
    const [loading, setLoading] = useState(true);

    // FETCH CART
    const fetchCart = async () => {

        try {

            setLoading(true);

            const fetching = await fetch(
                "http://localhost:5000/getcart",
                {
                    credentials: "include"
                }
            );

            const res = await fetching.json();

            setAdditem(res);

        } catch (e) {

            console.log(e);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchCart();

    }, []);

    return (

        <CartContext.Provider
            value={{
                additem,
                setAdditem,
                loading,
                fetchCart
            }}
        >

            {children}

        </CartContext.Provider>

    );
};

export const useCart = () => useContext(CartContext);