import React from "react";

const DevicePriceCards = (props) => {
  return (
    <div className="flex gap-6 bg-white justify-between items-start rounded-lg p-[20px] ">
      <div>
        <img
          className="w-[100px] sm:w-[120px] md:w-[150px]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmjX4AzMXjxyVKyfHZNlt877tnGHoEoDqOlA&usqp=CAU"
          alt="phone picture"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-xl md:text-3xl">{props.model}</p>
        </div>
        <div>
          <p className="text-[#EC2752] text-lg md:text-2xl">
            {props.ram}/{props.storage}
          </p>
          {/* <select className=" rounded bg-[#F5F4F9] text-[#EC2752] w-[220px] p-[5px] focus:outline-none"></select> */}
        </div>
        <div>
          <p className="text-xs md:text-lg text-[#9C9C9C]">Selling Price</p>
          <p className="font-bold text-2xl md:text-4xl text-[#EC2752]">
            ₹{props.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevicePriceCards;
