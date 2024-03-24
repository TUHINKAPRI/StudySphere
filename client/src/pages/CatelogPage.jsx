import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryCourse } from "../services/slices/categorySlice";
import { Link, useParams } from "react-router-dom";
import CourseCard from "../components/core/course/CourseCard";
import Footer from '../components/common/Footer'
function CatelogPage() {
  const dispatch = useDispatch();
  const { catelogId } = useParams();
  const { categoriesCourse } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchCategoryCourse({ id: catelogId }));
  }, []);
  return (
    <div className="">
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] w-11/12  flex-col justify-center gap-4 lg:max-w-maxContent ">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a>Catelog</a>
              </li>
              <li>{categoriesCourse[0]?.name}</li>
            </ul>
          </div>
          <p className="text-3xl text-richblack-5">
            {categoriesCourse[0]?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {categoriesCourse[0]?.description}
          </p>
        </div>
      </div>
      <div className=" mx-auto box-content   w-11/12 px-4 py-8 ">
        <h1 className="text-3xl mb-3">Courses to get you started</h1>
        <div className="w-11/12 flex justify-between gap-3 flex-wrap mx-auto">
          {categoriesCourse?.map((ele, i) => {
            return <CourseCard course={ele} key={i} />;
          })}
        </div>
      </div>
      <div className=" mx-auto box-content   w-11/12 px-4 py-8 ">
        <h1 className="text-3xl">Top selling course</h1>
        <div className="w-11/12 flex justify-between gap-3 flex-wrap mx-auto">
          {/* {categoriesCourse?.map((ele, i) => {
            return <CourseCard course={ele} key={i} />;
          })} */}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default CatelogPage;
