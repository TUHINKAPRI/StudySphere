import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import Navbar from "./components/common/Navbar";
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-Inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;