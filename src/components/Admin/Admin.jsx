import React, { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db-hook";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./admin.css";
import Navbar from "../nav/Navbar";
import { openDB } from 'idb';
const Admin = () => {
  const [Users, setUsers] = useState({});
  const [Details, setDetails] = useState({});
  const { getAll, update,delete:deleteRecord} = useIndexedDB("users");
  const navigate = useNavigate();


const deleteUser = async () => {
  try {
    // Open the database with the correct name and version
    const db = await openDB("MyDatabases", 1);

    // Begin a new transaction on the "users" store with readwrite access
    const tx = db.transaction("users", "readwrite");

    // Delete the record by the given id
    await tx.store.delete(Details.id);

    // Commit the transaction
    await tx.done;
fetchUsers()
    console.log(`User with id ${Details.id} has been deleted.`);
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};

  const fetchUsers = async () => {
    try {
      const allUsers = await getAll();
      console.log(allUsers);
      try {
        setUsers(allUsers);
        console.log(Users);
      } catch (error) {
        console.log("No connection");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
    const request = JSON.parse(localStorage.getItem("Request"))
    setDetails(request);
    console.log(Details.username);
  }, [Users.length > 0]);



  const UpdateUser = async () => {
    if (Details !== undefined) {
console.log(Details.username);
      try {
        await update({username:Details.username,email:Details.email,password:Details.password});
        deleteUser()
        fetchRecords();
      } catch (error) {
        console.error("Error updating record:", error);
      }
    } else {
      alert("something went wrong");
    }
  };
  const deleteRecordById = async (id) => {
    try {
      await deleteRecord({id:Details.id});
      fetchRecords(); // Refresh the list after deleting
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const fetchRecords = async () => {
    try {
      const allUsers = await getAll();
      setUsers(allUsers);
      console.log(Users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return (
    <div id="admincover">
      <Navbar />
      <div id="adminwrap">
        <div id="card">
          <h2>Admin powers</h2>
          <h3>(Previous Login Data)</h3>
          <table>
            <thead>
              <th>Username</th>
              <th>password</th>
              <th>Email ID</th>
              <th>Operations</th>
            </thead>

            <tbody>
              {Users !== undefined
                ? Object.keys(Users).map((item) => {
                    return (
                      <tr key={item}>
                        <td>{Users[item].username}</td>
                        <td>********</td>
                        <td>{Users[item].email}</td>
                        <td>
                          <button
                            style={{ backgroundColor: "green", width: "80%" }}
                            onClick={UpdateUser}
                          >
                            Update
                          </button>
                          <button
                          onClick={deleteUser}
                            style={{ backgroundColor: "red", width: "80%" }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
          <h3>-------end--------</h3>
        </div>
        <div id="card1">
          <h3 style={{ color: "white", textDecoration: "underline" }}>
            Update Requests
          </h3>
          <div id="piece">
            {Details !== undefined
              ? Object.keys(Details).map((item) => {
                  return <p > {item} : {Details[item]} || </p>;
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
