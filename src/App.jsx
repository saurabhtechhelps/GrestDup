import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import SelectBrand from "./pages/SelectBrand";
import InputNumber from "./pages/InputNumber";
import DeviceDetails from "./pages/DeviceDetails";
import Login from "./pages/Login";
import DeviceInformation from "./pages/DeviceInformation";
import PricePage from "./pages/Price";
import PhoneSelect from "./pages/PhoneSelect";
import { Provider } from "react-redux";
import store from "./store/store";
import Register from "./pages/Register";
import { AnswerProvider } from "./components/AnswerContext";
import { QuestionProvider } from "./components/QuestionContext";
import TableDetails from "./pages/TableDetails";
function App() {
  return (
    <>
      <AnswerProvider>
        <QuestionProvider>
          <Provider store={store}>
            <Router>
              <Routes>
                <Route path="/selectPhone" element={<SelectBrand />}></Route>
                <Route path="/devicedetail" element={<DeviceDetails />}></Route>

                <Route
                  path="/deviceinfo"
                  element={<DeviceInformation />}
                ></Route>
                {/* <Route
              path="/price"
              element={
                <AnswerProvider>
                  <PricePage />
                </AnswerProvider>
              }
            ></Route> */}

                <Route path="/inputnumber" element={<InputNumber />} />
                <Route path="/phone" element={<PhoneSelect />}></Route>

                <Route path="/" element={<Login />}></Route>

                <Route path="/register" element={<Register />}></Route>
                <Route path="/tabledetails" element={<TableDetails />}></Route>
              </Routes>
            </Router>
          </Provider>
        </QuestionProvider>
      </AnswerProvider>
    </>
  );
}

export default App;
