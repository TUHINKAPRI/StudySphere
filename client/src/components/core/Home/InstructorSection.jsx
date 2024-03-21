
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import { Link } from "react-router-dom";

const InstructorSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-[50%]">
          <img
            src={Instructor}
            alt=""
            className="shadow-white shadow-[-20px_-20px_0_0]"
          />
        </div>
        <div className="lg:w-[50%] flex gap-10 flex-col">
          <h1 className="lg:w-[50%] text-4xl font-semibold ">
            Become an
            <HighlightText text={"instructor"} />
          </h1>

          <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <Link
            to="/signup"
            className={`text-center w-fit text-black text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
        bg-yellow-50
       hover:shadow-none hover:scale-95 transition-all duration-200 `}
          >
            <span className=" flex items-center  gap-3">
              Start Teaching Today
              <FaArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
