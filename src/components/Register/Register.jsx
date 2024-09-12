import React, { useEffect, useLayoutEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db-hook";
import { useNavigate } from "react-router-dom";
import "./register.css";
const RegisterPage = () => {
  const [FormData, setFormData] = useState({});
  const [Users, setUsers] = useState({});
  const [InputData, setInputData] = useState({});
  const { add, getAll } = useIndexedDB("users");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resetpassword, setResetpassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const formSubmit = async (e) => {
    e.preventDefault();
    if (username && password !== undefined) {
      if (password === resetpassword) {
        console.log(username);
        try {
          await add({ username: username, email: email, password: password });
          alert("User added successfully!");
          setEmail("");
          setUsername("");
          setPassword("");
          setFormData(null);
          fetchUsers();
        } catch (error) {
          setFormData(error);
          console.log(FormData);
          console.error("Error adding user:", error);
          alert("Error adding user. Please try again.");
        }
      } else {
        alert("the passwords are miss matching");
      }
    } else {
      alert("Complete the input fileds");
    }
  };
  const fetchUsers = async () => {
    try {
      const allUsers = await getAll();
      setUsers(allUsers);
      console.log(Users);
      navigate("/");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return (
    <div id="Registercontainer">
      <div id="Registerwrapper">
        <div id="mainbox">
          <h4>RegisterPage</h4>
          <form onSubmit={formSubmit}>
            <label>Enter Username</label>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Example : adam@gmail.com"
            />
            <label>Enter Your email</label>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Example : adam@gmail.com"
            />
            <label>Enter Your password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <label>Confirm Your password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={(e) => setResetpassword(e.target.value)}
              placeholder="Re-Enter password"
            />
            <button type="submit">Register</button>
          </form>
          <a href="/">Dont have an account Register here</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
