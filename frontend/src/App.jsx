import Dashboard from "./pages/dashboard";
import PublicSign from "./pages/publicsign";
import Login from "./pages/login";
import Register from "./pages/register";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign/:token" element={<PublicSign />} />
        <Route path="/public/:token" element={<PublicSign />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

