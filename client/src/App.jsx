import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";
import CatelogPage from "./pages/CatelogPage";
import SingleCoursePage from "./pages/SingleCoursePage";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/dashboard/MyProfile";
import Learning from "./components/core/dashboard/Learning";
import Wishlist from "./components/core/dashboard/Wishlist";
import AccountInfo from "./components/core/dashboard/AccountInfo";
import { useSelector } from "react-redux";
import Instructor from "./components/core/dashboard/instructorDashboard/Instructor";
import EditCourse from "./components/core/dashboard/instructorDashboard/EditCourse";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
import MyCourses from "./components/core/dashboard/instructorDashboard/MyCourses";
import AddCourse from "./components/core/course/addCourse/AddCourse";

function App() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 font-Inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/category/:catelogId" element={<CatelogPage />} />
        <Route path="/course/:courseId" element={<SingleCoursePage />} />
        <Route element={<Dashboard />}>
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/account-info" element={<AccountInfo />} />
          {user?.accountType === "Student" && (
            <>
              {" "}
              <Route path="/dashboard/my-learning" element={<Learning />} />
              <Route path="/dashboard/wishlist" element={<Wishlist />} />
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
            </>
          )}
          {user?.accountType === "Instructor" && (
            <>
              <Route path="/dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/mycourses" element={<MyCourses />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
