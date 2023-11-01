import React, { useEffect, useState } from "react";
import DevicePriceCards from "../components/DevicePriceCards";
import ContinueButton from "../components/ContinueButton";
import downArrow from "../assets/down.png";
import { useNavigate } from "react-router-dom";
import { useAnswerContext } from "../components/AnswerContext";
import { useSelector } from "react-redux";
import PricePage from "./Price";
import axios from "axios";
import { auth } from "../config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const InputNumber = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const { filteredAnswers } = useAnswerContext();
  const [userToken, setUserToken] = useState("");
  const [mobileId, setMobileId] = useState("");
  const [submitdata, setSubmitData] = useState({});
  const [storage, setStorage] = useState("");
  const [phone, setPhone] = useState("+91");
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.user.profile);

  const handleClick = () => {
    if (number && number.length === 10) {
      setError(false);

      const data = {
        QNA: filteredAnswers,
        phoneNumber: number,
        modelId: mobileId,
        storage: storage,
      };
      axios
        .post(
          "https://phone-server-pundir72.vercel.app/api/questionnaires/calculatePrice",
          data,
          {
            headers: {
              Authorization: `${userToken}`,
            },
          }
        )
        .then((response) => {
          setSubmitData(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setShowPrice(true);
    } else {
      setError(!error);
    }
  };
  function handleback() {
    if (hasFilled === true) {
      setHasFilled(false);
    } else {
      navigate("/deviceinfo");
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    let id = localStorage.getItem("dataModel");
    id = JSON.parse(id);
    setMobileId(id?.models?._id);
    setStorage(id?.models?.config?.storage);
    setUserToken(token);
  }, []);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
  };

  const handleSend = (event) => {
    console.log("phone", phone);

    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  };

  const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);

    if (otp.length === 6) {
      // verifu otp
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          let user = result.user;
          console.log(user);
          alert("User signed in successfully");
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          alert("User couldn't sign in (bad verification code?)");
        });
    }
  };

  return showPrice ? (
    <PricePage
      setShowPrice={setShowPrice}
      submitdata={submitdata}
      userToken={userToken}
    />
  ) : (
    <div>
      <div className="flex items-center w-screen p-4 h-20 HEADER bg-white">
        <img
          src={downArrow}
          alt="arrow"
          className="h-5 md:h-8 w-12.5 transform rotate-90"
          onClick={handleback}
        />
        <div className="flex justify-between w-full ">
          <span className="w-4/5 text-xl md:text-3xl ml-4">
            Enter Mobile Number
          </span>
          <p className=" md:text-3xl text-xl mr-4">{userProfile?.name}</p>
        </div>
      </div>
      <div className="w-[90%] md:w-[70%]  mx-auto  h-[60vh] mt-10">
        {!hasFilled ? (
          <div className="flex flex-col items-center justify-center w-full h-15 h-13">
            <label htmlFor="number" className="block text-xl text-center">
              <span>Enter your number to unlock</span> the best price of your
              Phone
            </label>
            <input
              type="text"
              id="number"
              name="number"
              value={phone}
              onChange={(e) => {
                setError(false);
                setNumber(e.target.value);
                setPhone(e.target.value);
              }}
              className="block  border rounded-lg focus:ring focus:ring-[#EC2752] focus:outline-none pl-1 text-2xl h-14 mx-7 w-[80%] md:w-[60%] my-3"
            />
            <button onClick={handleSend}>Send OTP</button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-15 h-13">
            <label htmlFor="number" className="block text-xl text-center">
              <span>Verify OTP</span>
            </label>
            <input
              type="number"
              name="otp"
              value={otp}
              onChange={verifyOtp}
              className="block  border rounded-lg focus:ring focus:ring-[#EC2752] focus:outline-none pl-1 text-2xl h-14 mx-7 w-[80%] md:w-[60%] my-3"
            />
          </div>
        )}
        {error && (
          <p className="text-red-500 text-center">
            10-digit phone number is required
          </p>
        )}
      </div>
      <div onClick={handleClick}>
        <ContinueButton buttonName="Check Price" />
      </div>
      <div id="recaptcha"></div>
    </div>
  );
};

export default InputNumber;
