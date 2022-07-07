import React, { useEffect, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";

const Project = () => {
  const [project, setProject] = useState([]);
  const host = "http://localhost:3001";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${host}/api/post/allPost`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProject(await response.json());
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="w-screen min-h-screen pt-14 p-5">
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-4">
          {project.map((item, index) => (
            <div
              key={index}
              className={`mix ${item.category}`}
              data-order={index}
            >
              <img
                src={item.image}
                className="h-40 object-cover rounded-md"
                alt=""
                style={{ minWidth: "250px" }}
              />
              <p className="mt-4 text-xl font-bold">{item.name}</p>
              <p className="mb-2 font-medium text-sm">{item.category}</p>
              <p className="font-medium text-xs text-slate-500">{item.desc}</p>
              <p className="my-3 flex justify-start items-center hover:text-orange-400">
                <FiThumbsUp />
                <span className="ml-1 font-bold">{item.likeCount}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Project;
