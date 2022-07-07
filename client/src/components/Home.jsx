import React from "react";
import { Dashboard, Project } from "./index";

const Home = () => {
  return (
    <>
      <div className="flex justify-around px-10 py-5">
        <Project />
        <Dashboard />
      </div>
    </>
  );
};

export default Home;
