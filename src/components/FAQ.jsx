import React, { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const FAQ = () => {
  const [faqs, setFAQs] = useState([
    {
      question: "How did you calculate my device price?",
      answer:
        "Your price is calculated by determining the condition and working of your phone",
      isOpen: false,
    },
    {
      question: "Is it safe to sell my phone on GREST?",
      answer: "Yes, it is 100% safe to sell your phone on GREST",
      isOpen: false,
    },
  ]);

  const toggleFAQ = (index) => {
    const updatedFAQs = [...faqs];
    updatedFAQs[index].isOpen = !updatedFAQs[index].isOpen;
    setFAQs(updatedFAQs);
  };

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <li
            key={index}
            className="border-2 bg-[#E2E3EF] p-4 rounded-lg flex flex-col gap-2"
          >
            <div
              className="flex items-center justify-between"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {faq.isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </div>
            {faq.isOpen && <div>{faq.answer}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
