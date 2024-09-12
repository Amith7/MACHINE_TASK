import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";
import { useIndexedDB, initDB } from "react-indexed-db-hook";
import Profile from "./components/profile/Profile";
import Admin from "./components/Admin/Admin";
// Initialize the IndexedDB database
initDB({
  name: "MyDatabases",
  version: 1,
  objectStoresMeta: [
    {
      store: "users",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "username", keypath: "username", options: { unique: false } },
        { name: "email", keypath: "email", options: { unique: false } },
        { name: "password", keypath: "password", options: { unique: false } }
      ]
    }
  ]
});
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Registerpage" element={<RegisterPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/adminpage" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
