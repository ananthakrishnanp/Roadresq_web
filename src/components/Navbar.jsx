import React from "react";
import logo from '../assets/logo.svg';

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
     <nav className="flex flex-wrap items-center justify-between px-2 py-3 sticky top-0 z-20 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={logo} // Replace with the actual path to your logo image
                alt="Logo"
                className="h-12 mr-2" // Adjust the height and margin as needed
              />
              <a
                className="text-3xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                href="/"
              >
                RoadResQ
              </a>
            </div>
            {/* End Logo */}
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            
          </div>
        </div>
      </nav>
    </>
  );
}