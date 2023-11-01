import React, { useEffect, useState } from "react";
import DevicePriceCards from "../components/DevicePriceCards";
import ContinueButton from "../components/ContinueButton";
import downArrow from "../assets/down.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuestionContext } from "../components/QuestionContext";

import axios from "axios";

const PricePage = ({ submitdata, userToken, setShowPrice }) => {
  const [dataModel, setDataModel] = useState({});
  const [message, setMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const userProfile = useSelector((state) => state.user.profile);
  const { setAnswers } = useQuestionContext();
  const navigate = useNavigate();

  const handleBack = () => {
    setShowPrice(false);
  };
  const handleSubmit = () => {
    axios
      .post(
        "https://phone-server-pundir72.vercel.app/api/questionnaires/item-purchased",
        { id: submitdata.id },
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      )
      .then((response) => {
        setAnswers([]);
        setMessage(response.data.message);
        setDisableBtn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const data = localStorage.getItem("dataModel");
    setDataModel(JSON.parse(data));
  }, []);
  return (
    <div className="">
      <div className="flex items-center w-screen  p-4 h-20 HEADER bg-white">
        <img
          src={downArrow}
          alt="arrow"
          className="h-5 md:h-8 w-12.5 transform rotate-90"
          onClick={handleBack}
        />
        <div className="flex justify-between w-full ">
          <span className="w-4/5 text-xl md:text-3xl ml-4">Device Price</span>
          <p className=" md:text-3xl text-xl mr-4">{userProfile.name}</p>
        </div>
      </div>
      <div className="w-[90%] md:w-[70%] mx-auto mt-4 h-screen ">
        <p className=" sm:text-xl text-center font-semibold mb-4">
          The best price for your phone is:
        </p>
        <DevicePriceCards
          model={dataModel?.models?.name}
          price={submitdata.price}
          ram={dataModel?.models?.config?.RAM}
          storage={dataModel?.models?.config?.storage}
        />
        {message && <h3 className="text-center text-xl mt-4">{message}</h3>}
      </div>
      {!disableBtn ? (
        <div onClick={handleSubmit}>
          <ContinueButton buttonName="Submit details" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PricePage;
