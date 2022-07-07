import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="flex justify-between w-screen px-14 py-3 border-b">
        <p className="text-xl font-bold">Studio FiveFold</p>
        {/* <ul className="flex items-center">
          <Link to="/">
            <li>Dashboard</li>
          </Link>
          <Link to="/project">
            <li>Project</li>
          </Link>
          <li>About</li>
          <li>Contact</li>
          <li>
            {localStorage.getItem("user_name") ? (
              <span onClick={handleLogout}>Logout</span>
            ) : (
              navigate("/login")
            )}
          </li>
        </ul> */}
      </div>
    </>
  );
};

export default Navbar;
