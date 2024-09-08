import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/signup";
import Home from "./components/Home";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
