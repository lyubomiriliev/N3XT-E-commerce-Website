import { useState } from "react";

const Color = () => {
  const [showColors, setShowColors] = useState(true);

  const colors = [
    {
      _id: 5001,
      title: "Green",
      base: "#22c55e",
    },
    {
      _id: 5002,
      title: "Gray",
      base: "#a3a3a3",
    },
    {
      _id: 5003,
      title: "Red",
      base: "#dc2626",
    },
    {
      _id: 5004,
      title: "Yellow",
      base: "#f55e0b",
    },
    {
      _id: 5005,
      title: "Blue",
      base: "#3b82f6",
    },
  ];

  return (
    <div>
      <div
        onClick={() => setShowColors(!showColors)}
        className="cursor-pointer"
      >
        <h1 className="font-bold text-2xl w-48 mt-10 mb-10">Shop By Color</h1>
      </div>

      {showColors && (
        <div>
          <ul className="flex flex-col gap-4 text-sm lg:text-base">
            {colors.map((item) => (
              <li
                key={item._id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <span
                  style={{ background: item.base }}
                  className={`w-3 h-3 bg-gray-500 rounded-full`}
                ></span>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Color;
