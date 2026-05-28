import { useState } from "react";
import Adds from "./addproduct";
import Views from "./view";
import AddOffer from "./addoffer";

export default function Admin(){
    let components;
    const funclist =[
            "add product",
            "view product",
            "add offer",
            "Customers",
          ]
    const [lst ,setLst] = useState("")
    const [open, setOpen] = useState(false);

    const hdle = (e)=>{
            const {value} = e.target;
            setLst(value)
            setOpen(false)
    }
    
    switch(lst){
        case "add product":
            components = <Adds/>
            break
        case "view product":
            components =<Views/>
            break
        case "add offer":
            components =<AddOffer/>
            break

        default :
             components = <Adds/>
    }


  return (
    <div className="min-h-screen bg-[#202123] text-white overflow-x-hidden">
      
      {/* Navbar */}
      <div className="h-[60px] bg-[#343541] flex items-center px-4 md:px-6 gap-4 shadow-md">
        
        {/* Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-3xl cursor-pointer hover:scale-110 transition"
        >
          ☰
        </button>

        <h2 className="text-lg md:text-xl font-semibold">
          My App
        </h2>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen
          w-[80%] sm:w-[260px]
          bg-[#111827]
          p-5
          z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Admin</h2>

          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="text-2xl md:hidden"
          >
            X
          </button>
        </div>

        {/* Menu Items */}
        <ul className="space-y-3">
          {funclist.map((item, index) => (
            <button
              key={index}
              value={item}
              onClick={hdle}
              className="
                flex flex-col
                w-full
                p-4
                bg-[#1f2937] 
                rounded-lg
                cursor-pointer
                hover:bg-[#374151]
                transition
              "
            >
              {item}
            </button>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed inset-0
            bg-black/50
            z-40
            backdrop-blur-sm
          "
        />
      )}
      <div>
        {
           components          
        }
      </div>
    
    </div>
  );
}