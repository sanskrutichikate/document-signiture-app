import Dashboard from "./pages/dashboard";
import "./App.css";
import PublicSign from "./pages/publicsign";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sign/:token" element={<PublicSign />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

