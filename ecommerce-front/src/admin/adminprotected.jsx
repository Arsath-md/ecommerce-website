import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminProtected({ children }) {

    const [ok, setOk] = useState(null);

    useEffect(() => {

        const checkAdmin = async () => {

            try {

                const res = await fetch(
                    "http://localhost:5000/admincheck",
                    {
                        credentials: "include"
                    }
                );

                const data = await res.json();

                setOk(data.admin);

            } catch (err) {

                console.log(err);

                setOk(false);
            }
        };

        checkAdmin();

    }, []);

    if (ok === null) {
        return <h1>Loading...</h1>;
    }

    if (!ok) {
        console.log("erroro !ok")
        return <Navigate to="/adminlogin" />;
    }

    return children;
}