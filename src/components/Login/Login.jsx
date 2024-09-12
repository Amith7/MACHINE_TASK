import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useIndexedDB } from "react-indexed-db-hook";
const LoginPage = () => {
  const [FormData, setFormData] = useState({});
  const [InputData, setInputData] = useState({});
  const { getAll } = useIndexedDB("users");
  const [Users, setUsers] = useState({});
  const [eligibility, setEligibility] = useState(false);

  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(InputData);
    if (Users !== undefined) {
      const finded = Users.find((item) => item.email === InputData.email);
      const findpassword = Users.find(
        (item) => item.password === InputData.password
      );
      if (finded !== undefined && findpassword !== undefined) {
        setFormData((prev) => ({
          ...prev,
          ["message"]: "Login successfull....."
        }));
        alert(
          FormData.message !== undefined ? FormData.message : "login successful"
        );
        navigate(`/profile/${finded.id}`);
      } else {
        alert("give valid credentials");
      }
    } else {
      console.log("connection error occured");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    console.log(InputData);
  };
  useEffect(() => {
    fetchUsers();
  }, [Users.length > 0]);

  // ..............................................................................
  const fetchUsers = async () => {
    try {
      const allUsers = await getAll();
      console.log(allUsers);
      try {
        setUsers(allUsers);
      } catch (error) {
        console.log("No connection");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div id="logincontainer">
      <div id="logiwrapper">
        <div id="mainbox">
          <h4>LoginPage</h4>
          <form type="submit" onSubmit={formSubmit}>
            <label>Enter Your email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="Example : adam@gmail.com"
            />
            <label>Enter Your password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <button type="submit">Login</button>
          </form>
          <a href="/Registerpage">Dont have an account Register here</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
