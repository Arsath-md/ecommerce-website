import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function BillPage() {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const navi = useNavigate()
  const [orders, setOrders] = useState(null);
  const printRef = useRef();

  useEffect(() => {

    const fetchdata = async () => {

      try {

        const res = await  fetch(`${BASE_URL}/getcart`,
          {
            credentials: "include"
          }
        );

        const datum = await res.json();

        setOrders(datum);

      } catch (e) {

        console.log("error in bill", e);

      }

    };

    fetchdata();

  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!orders) {
    return <h2 className="p-5">Loading...</h2>;
  }

  if (orders.msg) {
    return <h2 className="p-5">{orders.msg}</h2>;
  }

  const grandTotal =
    orders.producting?.reduce(
      (acc, item) =>
        acc + item.productid.price * item.quantity,
      0
    ) || 0;

  return (

    <div className="bg-gray-100 min-h-screen flex justify-center p-6">

      {/* BILL CONTAINER */}
      <div
        ref={printRef}
        className="bg-white w-full max-w-3xl p-8 shadow-lg rounded-xl"
      >

        {/* HEADER */}
        <div className="text-center border-b pb-4">
          <h1 className="text-3xl font-bold">INVOICE</h1>
          <p className="text-gray-500">Thank you for your purchase</p>
        </div>

        {/* ORDER INFO */}
        <div className="flex justify-between mt-6 text-sm text-gray-600">
          <p><strong>Order ID:</strong> {orders._id}</p>
          <p><strong>Status:</strong> {orders.orderstatus || "Processing"}</p>
        </div>

        {/* TABLE */}
        <table className="w-full mt-6 border-collapse">

          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Price</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>

          <tbody>

            {orders.producting?.map((item) => (

              <tr key={item.productid._id} className="border-b">

                <td className="p-3">
                  {item.productid.p_name}
                </td>

                <td className="p-3">
                  {item.quantity}
                </td>

                <td className="p-3">
                  ₹{item.productid.price}
                </td>

                <td className="p-3 font-semibold">
                  ₹{item.productid.price * item.quantity}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* TOTAL */}
        <div className="text-right mt-6 text-xl font-bold">
          Grand Total: ₹{grandTotal}
        </div>

        {/* FOOTER */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          This is a computer generated invoice.
        </div>

        {/* PRINT BUTTON */}
        <div className="text-center mt-6 no-print">

          <button
            onClick={handlePrint}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Print Bill
          </button>

        </div>
          <div className="text-center mt-6 no-print">

          <button
            onClick={()=>navi("/")}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Done
          </button>

        </div>

      </div>

      {/* PRINT CSS */}
      <style>
        {`
          @media print {
            body {
              background: white;
            }

            .no-print {
              display: none;
            }

            div {
              box-shadow: none !important;
            }
          }
        `}
      </style>

    </div>
  );
}

export default BillPage;