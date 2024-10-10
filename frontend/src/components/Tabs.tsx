/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Tabs = () => {
  return (
    <div className="border-b border-gray-300 bg-gray-100">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500">
        <li className="me-2">
          <a
            href="#"
            className="inline-flex items-center justify-center font-semibold ml-3 w-32 py-1 px-4 text-black border-indigo-600 border-b-4 rounded-t-lg hover:border-indigo-600 group"
            aria-current="page"
          >
            Feed
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            className="inline-flex items-center justify-center w-32 py-1 px-4 border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 hover:text-gray-300 group"
          >
            People
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            className="inline-flex items-center justify-center w-32 py-1 px-4 border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 hover:text-gray-300 group"
          >
            About
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
