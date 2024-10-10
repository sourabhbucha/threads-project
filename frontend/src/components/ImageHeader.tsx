import React from "react";
import backgroundImage from "../assets/bg.jpg";
import Avatar from "../assets/u1.jpeg";
const ImageHeader = () => {
  return (
    <header>
      <img
        className="object-cover h-64 w-full"
        src={backgroundImage}
        alt="BG"
      />
      <div className="bg-indigo-300 py-0.5"></div>
      <div className="bg-indigo-700 text-white py-6 px-6 flex flex-col sm:flex-row  items-start sm:items-center justify-center">
        <div className="max-w-[1400px] w-full flex flex-col justify-center align-center">
          <h1 className="text-3xl font-bold">
            Cell Biology, Genetics and Evolution
          </h1>
          <div className="text-sm mt-2 flex justify-between items-start sm:items-center flex-wrap gap-2">
            <div className="flex items-center text-sm">
              <img
                className="object-cover rounded-full w-8 h-8"
                src={Avatar}
                alt="User"
              />
              <span className="m-2">2 Contributor</span> •{" "}
              <span className="m-2">230 Flashcards</span> •{" "}
              <span className="m-2">53 Subscribers</span>
            </div>
            <div>
              <button className="mr-3 mt-4 sm:mt-0 bg-white text-gray-600 font-semibold py-2 px-4 rounded">
                •••
              </button>
              <button className="mt-3 sm:mt-0 bg-white text-gray-600 font-semibold py-2 px-4 rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ImageHeader;
