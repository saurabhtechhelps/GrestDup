import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import downArrow from "../assets/down.png";
import FAQ from "../components/FAQ";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CircleCard from "../components/CircleCard";
import ContinueButton from "../components/ContinueButton";
import DeviceCard from "../components/DeviceCard";
import { useDataContext } from "../components/dataContext";

const DeviceDetails = () => {
  // const { dataModel, setdataModel } = useDataContext();
  const [dataModel, setDataModel] = useState({});
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.user.profile);
  const grestWork = [
    {
      title: "Add",
      detail: "product details",
    },
    {
      title: "Pickup",
      detail: "your device",
    },
    {
      title: "Transfer",
      detail: "your money",
    },
  ];
  useEffect(() => {
    // const userName = localStorage.getItem("username");
    const data = localStorage.getItem("dataModel");
    setDataModel(JSON.parse(data));
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    }
  }, []);

  function handleback() {
    navigate("/selectPhone");
  }
  return (
    <div className="pb-20">
      <div className="flex items-center w-screen p-4 h-20 HEADER bg-white">
        <img
          src={downArrow}
          alt="arrow"
          className=" h-5 md:h-8 w-12.5 transform rotate-90"
          onClick={handleback}
        />
        <div className="flex justify-between w-full ">
          <span className="w-4/5 text-xl md:text-3xl ml-4">Device details</span>
          <p className=" md:text-3xl text-xl mr-4">{userProfile.name}</p>
        </div>
      </div>
      <div className="w-[90%] md:w-[70%]  mx-auto mt-8">
        <DeviceCard
          model={dataModel?.models?.name}
          price={dataModel?.models?.config?.price}
        />
        <div className="flex justify-between p-4 bg-white border-t-2 ">
          <div className="flex flex-col items-center">
            <p className="text-[#9C9C9C]">Core</p>
            <p className="text-lg">{dataModel?.models?.core}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[#9C9C9C]">Back Camera</p>
            <p className="text-lg">{dataModel?.models?.back_camera}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[#9C9C9C]">Storage</p>
            <p className="text-lg">{dataModel?.models?.config?.storage}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[#9C9C9C]">Chipset</p>
            <p className="text-lg">{dataModel?.models?.chipset}</p>
          </div>
        </div>
        <div className=" bg-[#FEEBE5] rounded-b-lg p-2 text-sm flex justify-between md:justify-start gap-2 ">
          <div>
            <AiOutlineInfoCircle />
          </div>
          <p className="text-justify">
            This price depends on the condition of the product and is not final.
            The final proce offer will be quoted at the diagnosis by our
            experts.
          </p>
        </div>
        {/* how grest works */}
        <div>
          <div className="my-4">
            <h1 className="text-[#EC2752] font-semibold text-2xl">
              How Grest Works?
            </h1>
          </div>
          <div className="flex justify-around gap-2 text-center">
            {grestWork.map((ele, index) => (
              <CircleCard key={index} title={ele.title} detail={ele.detail} />
            ))}
          </div>
        </div>
        {/* FAQ */}
        <div className="mt-4">
          <div className="text-[#EC2752] font-semibold text-2xl mb-2">
            FAQ's
          </div>
          <FAQ />
        </div>

        {/* <Link to="/login">Got to login page</Link> */}
      </div>
      <ContinueButton moredevicedetail={"/deviceinfo"} />
    </div>
  );
};

export default DeviceDetails;
