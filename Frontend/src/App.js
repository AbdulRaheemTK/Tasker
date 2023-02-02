import "./App.css";
import Login from "./features/Login/Login";
import Signup from "./features/Signup/Signup";
import { Routes, Route } from "react-router-dom";
import Home from "./features/Home/Home";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const { user } = useSelector((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
