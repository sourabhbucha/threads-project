import React from "react";

const Header = () => {
  return (
    <>
      <nav className="flex-1 flex py-5 px-10 text-gray-500 justify-between items-center">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          <h2 className="ml-4 font-semibold text-base">
            Cell Biology, Genetics and Evolution
          </h2>
        </div>
        <span className="text-xl font-semibold">•••</span>
      </nav>
    </>
  );
};

export default Header;
