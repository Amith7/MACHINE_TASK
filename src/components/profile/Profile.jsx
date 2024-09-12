import React, { useEffect, useState } from "react";
import Navbar from "../nav/Navbar";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { useIndexedDB } from "react-indexed-db-hook";
import { useParams } from "react-router-dom";
import Prompt from "../prompt/Prompt";
const Profile = () => {
  const { getAll } = useIndexedDB("users");
  const [Users, setUsers] = useState({});
  const [Details, setDetails] = useState({});
  const { id } = useParams();
  const [Scecret, setScecret] = useState("");
  const navigate = useNavigate();
  //   .................................................................
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  const handleShowPrompt = () => {
    setIsPromptVisible(true);
  };

  const handleConfirm = () => {
    alert("Confirmed!..Admin verification is in the process ..please wait");
    setIsPromptVisible(false);
  };

  const handleCancel = () => {
    alert("Cancelled!");
    setIsPromptVisible(false);
  };
  // ...............................................................
  const fetchUsers = async () => {
    try {
      const allUsers = await getAll();
      console.log(allUsers);
      try {
        setUsers(allUsers);
        const finded = Users.find((item) => item.id == id);
        if (finded !== undefined) {
          console.log("we got him" + finded.username);
          setDetails(finded);
          console.log(Details);
        }
      } catch (error) {
        console.log("No connection");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [Users.length > 0]);
  const formsubmit = (e) => {
    e.preventDefault();
    const OriginalKey = "amith12345";
    if (OriginalKey === Scecret) {
      alert("Welcome Admin .... Mr/Mrs : " + Details.username);
      navigate("/adminpage");
    } else {
      alert("Unauthorized entry detected.......");
    }
  };

  return (
    <div id="profilecover">
      <Navbar />
      <div id="profilewrap">
        <div id="profilecard">
          <h2>Hi welcome Mr/Mrs " {Details.username} "</h2>
          <p className="profilelabel">
            UserName :{" "}
            <span style={{ color: "green" }}>
              {" "}
              <em>{Details.username}</em>
            </span>
          </p>
          <p className="profilelabel">
            Password :{" "}
            <span style={{ color: "red" }}>
              {" "}
              <em>************</em>
            </span>
          </p>

          <p className="profilelabel">
            EmailId :{" "}
            <span style={{ color: "blue" }}>
              {" "}
              <em>{Details.email}</em>
            </span>
          </p>
          <label>if you want to update?</label>
          <button
            onClick={handleShowPrompt}
            style={{
              backgroundColor: "green",
              width: "30%",
              margin: "0px",
              marginLeft: "20px"
            }}
          >
            Update me
          </button>
          <div>
            {isPromptVisible && (
              <Prompt
                message="Are you sure you want to proceed?"
                data={Details}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
          </div>

          <div style={{ marginTop: "10px" }}>
            <label>if you want to delete account?</label>

            <button
              style={{ backgroundColor: "red", width: "30%", margin: "0px" }}
            >
              Delete me
            </button>
          </div>

          <form onSubmit={formsubmit}>
            <label>
              If you want to login as an admin ? enter the scecret Key
            </label>
            <input type="text" onChange={(e) => setScecret(e.target.value)} />
            <button onClick={formsubmit}>Confirm</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
