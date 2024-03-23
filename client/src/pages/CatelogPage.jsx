import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryCourse } from "../services/slices/categorySlice";
import { Link, useParams } from "react-router-dom";
import Caurosule from "../components/common/Caurosule";

function CatelogPage() {
  const dispatch = useDispatch();
  const { catelogId } = useParams();
  const { categoriesCourse } = useSelector((state) => state.categories);
  console.log(categoriesCourse);
  useEffect(() => {
    dispatch(fetchCategoryCourse({ id: catelogId }));
  }, []);
  return (
    <div>
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
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
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="w-11/12 mx-auto">
          <Caurosule />
        </div>
      </div>
    </div>
  );
}

export default CatelogPage;
