import React, { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard";
import ContinueButton from "../components/ContinueButton";
import downArrow from "../assets/down.png";
import { useNavigate } from "react-router-dom";
import { useAnswerContext } from "../components/AnswerContext";
import { useQuestionContext } from "../components/QuestionContext";
import { useSelector } from "react-redux";
import axios from "axios";

const DeviceInformation = () => {
  const [dataModel, setDataModel] = useState({});
  const [questions, setQuestions] = useState([]);
  const { setFormAnswers } = useAnswerContext();
  const { answers, setAnswers } = useQuestionContext();
  const userProfile = useSelector((state) => state.user.profile);
  const navigate = useNavigate();

  function handleback() {
    navigate("/devicedetail");
  }

  const handleChange = (event, questionIndex, group) => {
    const { value } = event.target;

    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = {
      quetion: questions[questionIndex].quetion,
      answer: value,
      group,
    };
    setAnswers(updatedAnswers);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          "https://phone-server-pundir72.vercel.app/api/questionnaires/findAll?page=0&limit=31";

        const response = await axios.get(apiUrl);

        setQuestions(response.data.data);
        const newPopulateAnswers = response.data.data.map((ele) => ele.default);

        if (answers.length === 0) {
          const newAnswers = newPopulateAnswers.map((answer, index) => {
            return {
              quetion: response.data.data[index].quetion,
              answer,
              group: response.data.data[index].group,
            };
          });
          setAnswers(newAnswers);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const data = localStorage.getItem("dataModel");
    setDataModel(JSON.parse(data));
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async () => {
    const filteredAnswers = answers.filter((answer) => answer !== null);
    const formattedAnswers = {};
    answers.forEach((ele, index) => {
      const groupName = ele.group;

      if (!formattedAnswers[groupName]) {
        formattedAnswers[groupName] = [];
      }
      formattedAnswers[groupName].push({
        quetion: ele.quetion,
        answer: ele.answer,
      });
    });
    setFormAnswers(formattedAnswers);
  };

  return (
    <div className="pb-20">
      <div className="flex items-center w-screen p-4 h-20 bg-white HEADER">
        <img
          src={downArrow}
          alt="arrow"
          className=" h-5 md:h-8 w-12.5 transform rotate-90"
          onClick={handleback}
        />
        <div className="flex justify-between w-full ">
          <span className="w-4/5 text-xl md:text-3xl ml-4">
            More Device details
          </span>
          <p className=" md:text-3xl text-xl mr-4">{userProfile.name}</p>
        </div>
      </div>
      <div className="w-[90%] md:w-[70%]  mx-auto">
        <h1 className="text-[#EC2752] font-semibold text-lg my-4">
          Tell Us More About Your Device
        </h1>
        <DeviceCard
          model={dataModel?.models?.name}
          price={dataModel?.models?.config?.price}
        />
        <div className="my-4">
          <form>
            {questions &&
              questions.map((data, index) => (
                <div className="flex flex-col gap-4 mb-4" key={data._id}>
                  <div className="flex gap-1">
                    <p className="text-xl">{index + 1}.</p>
                    <p className="text-xl">{data.quetion}</p>
                  </div>
                  <div className="max-w-[200px] flex gap-20 ml-3">
                    <label className="text-[#EC2752] font-medium">
                      <input
                        name={data._id}
                        type="radio"
                        value={data.yes}
                        onChange={(e) => handleChange(e, index, data.group)}
                        checked={answers[index].answer === data.yes}
                      />{" "}
                      Yes
                    </label>
                    <label className="text-[#EC2752] font-medium">
                      <input
                        name={data._id}
                        type="radio"
                        value={data.no}
                        onChange={(e) => handleChange(e, index, data.group)}
                        checked={answers[index].answer === data.no}
                      />{" "}
                      No
                    </label>
                  </div>
                  <div className="border-b-2 opacity-10 border-[#9C9C9C] max-w-[500px]"></div>
                </div>
              ))}
          </form>
        </div>
      </div>
      <div onClick={handleSubmit}>
        <ContinueButton moredevicedetail={"/inputnumber"} />
      </div>
    </div>
  );
};

export default DeviceInformation;
