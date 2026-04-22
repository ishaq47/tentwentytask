import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-0 lg:top-6 left-0 w-full flex justify-center z-50">
      <div className="w-full lg:w-[90%] bg-white/90 backdrop-blur-md px-8 py-4 shadow-sm">
        <div className="flex items-center justify-between">

          <div className="hidden lg:flex gap-8 text-sm text-gray-700">
            <a href="#">About</a>
            <a href="#">News</a>
            <a href="#">Services</a>
            <a href="#">Our Team</a>
            <a href="#">Make Enquiry</a>
          </div>

          
          <button className="w-[148px] flex gap-2 border border-gray-400 px-5 py-2 text-sm hover:bg-black hover:text-white transition">
            Contact us <FaArrowRightLong className="flex self-center" />
          </button>

          
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-2xl"
          >
            {open ? <IoCloseOutline /> : <CiMenuBurger />}
          </button>
        </div>

      
        {open && (
          <div className="flex flex-col gap-4 mt-5 text-sm text-gray-700 lg:hidden">
            <a href="#">About</a>
            <a href="#">News</a>
            <a href="#">Services</a>
            <a href="#">Our Team</a>
            <a href="#">Make Enquiry</a>
          </div>
        )}
      </div>
    </div>
  );
}