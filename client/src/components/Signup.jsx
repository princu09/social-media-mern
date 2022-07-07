import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import signup from "../assets/signup.png";
import { FaUserCircle, FaLock, FaEnvelope } from "react-icons/fa";

const Signup = () => {
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const host = "http://localhost:3001";

  const handleSubmit = async (e) => {
    localStorage.clear();
    setError("");

    e.preventDefault();
    const response = await fetch(`${host}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (json.error) {
      alert(json.error);
      setError(json.error);
    }

    if (json.message) {
      // redirect
      localStorage.setItem("uemail", json.user.email);
      localStorage.setItem("uname", json.user.name);
      navigate("/");
    }
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <p className="text-3xl font-medium">Signup</p>
            <form method="POST" className="my-8 w-80 border p-5 rounded-md">
              {error ? (
                <p className="my-5 bg-red-600 text-white p-2 rounded w-full text-sm text-center">
                  {error}
                </p>
              ) : (
                ""
              )}

              <div className="relative">
                <FaUserCircle className="absolute top-5" />
                <input
                  type="text"
                  className="font-medium w-full my-3 p-1 pb-2 outline-none focus:border-orange-400 border-b-2 border-slate-400 pl-6"
                  placeholder="Name"
                  name="name"
                  value={credentials.name}
                  onChange={onchange}
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute top-5" />
                <input
                  type="email"
                  className="font-medium w-full my-3 p-1 pb-2 outline-none focus:border-orange-400 border-b-2 border-slate-400 pl-6"
                  placeholder="Email"
                  name="email"
                  value={credentials.email}
                  onChange={onchange}
                />
              </div>
              <div className="relative">
                <FaLock className="absolute top-5" />
                <input
                  type="password"
                  className="font-medium w-full my-3 p-1 pb-2 outline-none focus:border-orange-400 border-b-2 border-slate-400 pl-6"
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={onchange}
                />
              </div>
              <button
                className="bg-orange-400 text-white w-full h-8 rounded my-3 hover:bg-transparent hover:border-2 border-orange-400 hover:text-orange-400"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>

            <Link to="/login" className="hover:text-orange-600">
              Already have an Account ?
            </Link>
          </div>
          <img src={signup} alt="" className="w-96" />
        </div>
      </div>
    </>
  );
};

export default Signup;
