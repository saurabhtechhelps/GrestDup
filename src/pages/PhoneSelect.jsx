import axios from "axios";
import React, { useEffect, useState } from "react";

const PhoneSelect = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          "https://phone-server-eosin.vercel.app/api/phones/phoneList?page=0&limit=10";
        const res = await axios.get(apiUrl);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>phone select</h1>
    </div>
  );
};

export default PhoneSelect;
