import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar, Home } from "./components";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
