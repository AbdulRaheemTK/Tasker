import "./App.css";
import Login from "./features/Login/Login";
import Signup from "./features/Signup/Signup";
import { Routes, Route } from "react-router-dom";
import Home from "./features/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
