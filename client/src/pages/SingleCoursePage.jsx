import { useEffect, useState } from "react";
import Footer from "../components/common/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/slices/courseSlice";
import { GoCheck } from "react-icons/go";
import ReactStars from "react-rating-stars-component";
import { FaMobileScreenButton, FaUsers } from "react-icons/fa6";
import {
  MdOndemandVideo,
  MdOutlineLanguage,
  MdOutlineSlowMotionVideo,
  MdUpdate,
} from "react-icons/md";
import Accrodion from "../components/common/Accordion";
import { RxDotFilled } from "react-icons/rx";
import { IoMdStar } from "react-icons/io";
import { SlBadge } from "react-icons/sl";

function SingleCoursePage() {
  const wuwl = [
    "Master Machine Learning on Python & R",
    "Have a great intuition of many Machine Learning models",
    "Make accurate predictions",
    "Make powerful analysis",
  ];
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { courseDetails } = useSelector((state) => state.course);
  console.log(courseDetails);
  const [totalLecture, setTotalLecture] = useState(0);
  useEffect(() => {
    let total = 0;
    courseDetails?.courseContent?.forEach((sec) => {
      console.log(sec.subSection.length);
      total = total + sec.subSection.length;
    });
    setTotalLecture(total);
  }, [courseDetails]);
  useEffect(() => {
    dispatch(fetchCourseDetails(courseId));
  }, [courseId, dispatch]);
  document.getElementById("where-to-render");
  return (
    <div className="">
      <div className="bg-richblack-800 relative  flex h-[370px] ">
        <div className=" ms-14 py-6    w-[600px] mx-auto">
          <div className="text-sm breadcrumbs mb-4">
            <ul>
              <li>
                <a>Development</a>
              </li>
              <li>
                <a>category</a>
              </li>
              <li>{courseDetails?.category?.name}</li>
            </ul>
          </div>
          <div className="pb-0 ">
            <div className="space-y-2 mb-5">
              <h1 className="text-3xl mb-3 font-bold">
                Machine Learning A-Z: AI, Python & R + ChatGPT Prize [2024]
                {courseDetails?.name}
              </h1>
              <p className="text-sm text-gray-500 grid gap-1 sm:text-base md:gap-2 lg:text-sm/relaxed xl:text-base/relaxed dark:text-gray-400">
                Learn to create Machine Learning Algorithms in Python and R from
                two Data Science experts. Code templates included.
                {courseDetails?.description}
              </p>
            </div>
            <div className="flex items-center mb-4 gap-3">
              <div className="badge  badge-neutral text-sm">New</div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5 text-sm">{4}</span>
                <ReactStars
                  edit={false}
                  value={4}
                  size={16}
                  activeColor="#ffd700"
                />
              </div>
              <div className="text-sm">
                ({courseDetails?.ratingAndReviews?.length || 656} ratings)
              </div>
              <div className="text-sm ">2654 students</div>
            </div>
            <div className="flex gap-3 mb-5 text-sm">
              <h3 className=" ">
                <span>Created by</span>
                <span className="mx-1">
                  {courseDetails?.instructor?.firstName}
                </span>
                {courseDetails?.instructor?.lastName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Assistant Professor of Quantum Computing
              </p>
            </div>
            <div className="flex items-center text-sm gap-3">
              <div className="flex gap-2 items-center">
                <span>
                  <MdUpdate />
                </span>
                <span>Last updated 03/02/24</span>
              </div>
              <div className="flex gap-2 items-center">
                <span>
                  <MdOutlineLanguage />
                </span>
                <span>English</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" absolute rounded-sm"
          style={{ right: "100px", top: "140px" }}
        >
          <div className="card rounded-md w-80 bg-base-100 shadow-xl">
            <figure className="">
              <img
                src={courseDetails?.thumbnail}
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body  ">
              <h2 className="card-title">Rs. {courseDetails?.price}</h2>

              <div className="mb-3  text-sm">
                <div className="  text-sm font-bold">
                  This course includes :
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <MdOndemandVideo />
                    <span>3 hours Demand video</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMobileScreenButton />
                    <span>Access on mobile and laptop</span>
                  </div>
                </div>
              </div>

              <div className="card-actions flex justify-around">
                <button className="btn w-auto  btn-primary">Buy Now</button>
                <button className="btn  btn-primary">AddToCart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" max-w-6xl flex flex-col mx-auto py-8 ">
        <div className="w-[600px]">
          <div className=" py-4  ">
            <h4 className="ms-6 mb-4 text-2xl font-bold">
              What you will Learn
            </h4>
            <div className="w-[550px] mb-4 gap-3 mx-auto grid grid-cols-2">
              {wuwl.map((ele, i) => {
                return (
                  <div className="flex text-sm" key={i}>
                    <span className="me-2">
                      <GoCheck />
                    </span>
                    <span>{ele}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="my-4 ms-6 text-sm">
            <div className=" mb-4 text-2xl font-bold">
              This course includes :
            </div>
            <div className="grid grid-cols-2">
              <div className="flex gap-2 items-center">
                <MdOndemandVideo />
                <span>3 hours Demand video</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMobileScreenButton />
                <span>Access on mobile and laptop</span>
              </div>
            </div>
          </div>
          <div className="my-4 ms-6 text-sm">
            <div className=" mb-4 text-2xl font-bold">Course content</div>
            <div className="text-sm flex mb-3 gap-2">
              <span>9 section .</span>
              <span>{totalLecture} lecture .</span>
              <span>3 hours Total length</span>
            </div>
            <div>
              <Accrodion course={courseDetails?.courseContent} />
            </div>
          </div>
          <div className="my-4 ms-6 text-sm">
            <div className=" mb-4 text-2xl font-bold">Requirements</div>
            <div className="flex flex-col gap-4">
              <span className="flex items-center gap-3">
                <RxDotFilled className="text-xl" /> Student should be familiar
                with programming concepts
              </span>
              <span className="flex items-center gap-3">
                {" "}
                <RxDotFilled className="text-xl" /> Students should have an
                internet connection
              </span>
              <span className="flex items-center gap-3">
                {" "}
                <RxDotFilled className="text-xl" /> Willingness to follow
                through with the lectures until the end
              </span>
            </div>
          </div>
          <div className="my-4 ms-6 text-sm">
            <div className=" mb-4 text-2xl font-bold">Instructor</div>
            <div className="flex flex-col gap-1">
              <div className="text-xl font-blod underline">
                <span>{courseDetails?.instructor?.firstName}</span>
                <span>{courseDetails?.instructor?.lastName}</span>
              </div>
              <div>Asistant Professor 8000+ students</div>
              <div className="flex items-center gap-4">
                <div className="w-28 h-28 mt-2">
                  <img
                    src={courseDetails?.instructor?.image}
                    alt=""
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col  h-28 justify-evenly">
                  <div className="flex items-center gap-4">
                    {" "}
                    <IoMdStar className="" /> 4.4 ratings
                  </div>
                  <div className="flex items-center gap-4">
                    {" "}
                    <SlBadge /> 123 reviews
                  </div>
                  <div className="flex items-center gap-4">
                    {" "}
                    <FaUsers /> 800+ students
                  </div>
                  <div className="flex items-center gap-4">
                    {" "}
                    <MdOutlineSlowMotionVideo />{" "}
                    {courseDetails?.instructor?.courses.length} courses
                  </div>
                </div>
              </div>
              <div className="my-3">
                Tuhin Kapri is a software and web technologies engineer, a life
                coach trainer who is also a serial entrepreneur with multiple
                online businesses, ranging from online jewelry shops, affiliate
                websites, application development and consultations services,
                personal online schools, etc.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SingleCoursePage;
