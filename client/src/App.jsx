import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-Inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
