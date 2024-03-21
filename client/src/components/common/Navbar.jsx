import { Link, useLocation } from "react-router-dom";
import { linkData } from "../../data/navbar-links";
import { BsChevronDown } from "react-icons/bs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory } from "../../services/slices/categorySlice";
function Navbar() {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.categories);
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchAllCategory());
  }, []);
  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200 text-white`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <div>StudySphere</div>

        <div className="flex gap-6">
          {linkData?.map((ele, index) => {
            return (
              <div key={index}>
                {ele.title == "Catalog" ? (
                  <div className="dropdown dropdown-hover ">
                    <div tabIndex={0} role="button" className=" flex gap-1">
                      {ele.title}
                      <BsChevronDown className="mt-1 hover:" />
                    </div>
                    <div
                      className="dropdown-content ms-14"
                      style={{
                        width: "0",
                        height: "0",
                        "border-left": "10px solid transparent",
                        "border-right": "10px solid transparent",
                        "border-bottom": "10px solid rgb(15 23 42)",
                      }}
                    ></div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] mt-2 menu p-2 shadow bg-base-100 rounded-xl w-52"
                    >
                      {isLoading ? (
                        <div>Loading</div>
                      ) : (
                        <>
                          {categories?.map((ele, index) => (
                            <li key={index}>
                              <Link>{ele.name}</Link>
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={`${ele.path}`}
                    className={`${
                      location.pathname === ele.path
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    {ele.title}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex gap-4">
          <Link to="/signup">
            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[6px] text-richblack-100">
              Signup
            </button>
          </Link>
          <Link to="/login">
            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[6px] text-richblack-100">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
