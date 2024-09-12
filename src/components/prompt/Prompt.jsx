import React, { useState, useEffect } from "react";
import "./Prompt.css";

const Prompt = ({ message, onConfirm, onCancel, data }) => {
    console.log(data.id);
  const [CUsername, setCUsername] = useState(undefined);
  const [CPassword, setCPassword] = useState(undefined);
  const [CEmail, setCEmail] = useState(undefined);
  const [CId,setCid]=useState("")
  const handlechange = () => {
    console.log(CUsername);
const changedDatas={
username:CUsername!==undefined?CUsername:data.username,
password:CPassword!==undefined?CPassword:data.password,
email:CEmail!==undefined?CEmail:data.email,
id:data.id
}
localStorage.setItem('Request',JSON.stringify(changedDatas));
onConfirm()

  };
  return (
    <div className="prompt-overlay">
      <div className="prompt-box">
        <p>{message}</p>
        <p>change the existing values as per you want</p>
        <label>username</label>
        <input
          value={CUsername == undefined ? data.username : CUsername}
          onChange={(e) => setCUsername(e.target.value)}
        /><br/>
        <label>passwrod</label>
         <input
          value={CPassword == undefined ? data.password : CPassword}
          onChange={(e) => setCPassword(e.target.value)}
        /><br/>
           <label>email Id</label>
         <input
          value={CEmail == undefined ? data.email : CEmail}
          onChange={(e) => setCEmail(e.target.value)}
        /><br/>
        <button onClick={handlechange}>
          Confirm
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Prompt;
