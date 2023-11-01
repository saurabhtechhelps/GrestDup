// import React, { useState } from "react";
// import { menuItems } from "../utils/data";
// import DeviceCard from "./DeviceCard";
// import DefectCard from "./DefectCard";

// const Dropdown = () => {
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   const [selectedPhone, setSelectedPhone] = useState(null);

//   const toggleBrand = (brand) => {
//     if (selectedBrand === brand) {
//       setSelectedBrand(null);
//       setSelectedPhone(null);
//     } else {
//       setSelectedBrand(brand);
//     }
//   };

//   const selectPhone = (phone) => {
//     setSelectedPhone(selectedPhone === phone ? null : phone);
//   };

//   return (
//     <>
//       {" "}
//       <div className="flex flex-col gap-2 mx-[5px]">
//         {menuItems.map((brand, index) => (
//           <div key={index} className="relative">
//             <div className="flex border justify-between bg-white p-[10px] rounded">
//               <p onClick={() => toggleBrand(brand)}>{brand.title}</p>
//               {selectedBrand === brand && (
//                 <div className="dropdown-menu absolute top-full left-0 w-full z-10">
//                   {brand.phones.map((phone, phoneIndex) => (
//                     <div key={phoneIndex} className="relative">
//                       <div
//                         className="flex border justify-between bg-white p-[10px] rounded"
//                         onClick={() => selectPhone(phone)}
//                       >
//                         <p>{phone.title}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="m-[20px]"></div>
//       <DefectCard error="Broken/Scratch on device screen" />
//     </>
//   );
// };

// export default Dropdown;
