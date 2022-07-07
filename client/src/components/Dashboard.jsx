import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { BsHandThumbsUpFill } from "react-icons/bs";

const Dashboard = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    desc: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const host = "http://localhost:3001";

  const handleSubmit = async (e) => {
    setError("");
    setMsg("");

    e.preventDefault();
    const response = await fetch(`${host}/api/post/uploadPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        category: data.category,
        desc: data.desc,
        image: data.image,
      }),
    });

    const json = await response.json();

    if (json.error) {
      setError(json.error);
    }

    if (json.message) {
      setMsg("Data Added Successfully.");
    }
  };

  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="w-72">
        <p className="text-center text-2xl font-bold mb-5 pb-3 text-orange-500 border-b-2">
          Add Project
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {error ? (
            <p className="my-5 bg-red-600 text-white p-2 rounded w-full text-sm text-center">
              {error}
            </p>
          ) : (
            ""
          )}
          {msg ? (
            <p className="my-5 bg-green-600 text-white p-2 rounded w-full text-sm text-center">
              {msg}
            </p>
          ) : (
            ""
          )}

          <input
            type="text"
            className="border-slate-600 border rounded my-2 p-1 px-2"
            placeholder="Name"
            onChange={onchange}
            name="name"
          />
          <select
            className="border-slate-600 border rounded my-2 p-1 px-2"
            onChange={onchange}
            name="category"
          >
            <option>Select...</option>
            <option value="Adapative Reuse">Adapative Reuse</option>
            <option value="Architecture">Architecture</option>
            <option value="Interior Design">Interior Design</option>
            <option value="Compitetions">Compitetions</option>
          </select>
          <textarea
            name="desc"
            cols="30"
            rows="5"
            placeholder="Description..."
            className="border-slate-600 border rounded my-2 p-1 px-2"
            onChange={onchange}
          />
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => setData({ ...data, image: base64 })}
          />
          <button
            className="bg-orange-400 text-white w-full h-8 rounded my-3 hover:bg-transparent hover:border-2 border-orange-400 hover:text-orange-400 flex justify-center items-center font-bold"
            type="submit"
          >
            Submit <BsHandThumbsUpFill className="ml-2" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
