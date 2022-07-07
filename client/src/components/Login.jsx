import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.png";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const host = "http://localhost:3001";

  const handleSubmit = async (e) => {
    localStorage.clear();
    setError("");

    e.preventDefault();
    const response = await fetch(`${host}/api/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (json.error) {
      setError(json.error);
    }

    if (json.authtoken) {
      // redirect
      localStorage.setItem("user_email", json.user.email);
      localStorage.setItem("user_name", json.user.name);
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    }
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="flex justify-center items-center">
          <img src={login} alt="" className="w-96" />
          <div className="flex flex-col justify-center items-center mr-24">
            <p className="text-3xl font-medium">Login</p>
            <form method="POST" className="my-8 w-80 border p-5 rounded-md">
              {error ? (
                <p className="my-5 bg-red-600 text-white p-2 rounded w-full text-sm text-center">
                  {error}
                </p>
              ) : (
                ""
              )}
              <div className="relative login">
                <FaEnvelope className="absolute top-5" />
                <input
                  type="email"
                  name="email"
                  className="font-medium w-full my-3 p-1 pb-2 outline-none focus:border-orange-400 border-b-2 border-slate-400 pl-6"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={onchange}
                />
              </div>

              <div className="relative login">
                <FaLock className="absolute top-5" />
                <input
                  type="password"
                  name="password"
                  className="font-medium w-full my-3 p-1 pb-2 outline-none focus:border-orange-400 border-b-2 border-slate-400 pl-6"
                  placeholder="Password"
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

            <Link to="/signup" className="hover:text-orange-600">
              Don't have an Account ?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
