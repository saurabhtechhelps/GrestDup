import React, { useEffect, useState } from "react";

const DeviceCard = (props) => {
  const [dataModel, setDataModel] = useState({});
  useEffect(() => {
    const data = localStorage.getItem("dataModel");
    setDataModel(JSON.parse(data));
  }, []);
  return (
    <div className="flex gap-2 bg-white justify-between items-start rounded-lg p-[20px] ">
      <div>
        <img
          className="w-[100px] sm:w-[120px] md:w-[150px]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmjX4AzMXjxyVKyfHZNlt877tnGHoEoDqOlA&usqp=CAU"
          alt="phone picture"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p className="md:text-3xl">{props.model} </p>
        </div>
        <div>
          <select className=" rounded bg-[#F5F4F9] text-[#EC2752] w-[180px] sm:w-[300px] md:w-[400px] md:h-12 p-[5px] focus:outline-none">
            <option className="text-[#EC2752]">
              {dataModel?.models?.config.RAM}/
              {dataModel?.models?.config.storage}
            </option>
          </select>
        </div>
        <div>
          <p className="text-xs md:text-lg text-[#9C9C9C]">Get Upto</p>
          <p className="font-bold text-2xl md:text-4xl text-[#EC2752]">
            ₹{props.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
