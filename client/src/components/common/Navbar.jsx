import { Link, useLocation } from "react-router-dom";
import { linkData } from "../../data/navbar-links";
import { BsChevronDown } from "react-icons/bs";
import { useEffect } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory } from "../../services/slices/categorySlice";

function Navbar() {
  
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchAllCategory());
  }, []);
  return (
    <div
      className={`flex h-16 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200 text-white`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <div>
          <img src="/capture.PNG" alt="Logo" className="h-[70px] mb-2" />
        </div>

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
                        borderLeft: "10px solid transparent",
                        borderRight: "10px solid transparent",
                        borderBottom: "10px solid rgb(15 23 42)",
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
                              <Link to={`/category/${ele._id}`}>{ele.name}</Link>
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
                    {ele?.title}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
        {token ? (
          <div className="flex items-center gap-2">
            <Link>
              <MdFavoriteBorder className="text-xl cursor-pointer" />
            </Link>
            {/* cart */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* profile */}
            <details className="dropdown dropdown-end">
              <summary
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Profile" src={user?.image} />
                </div>
              </summary>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <div className="mx-4">
                  <span>Hello!</span>
                  <span className="mx-1">{user?.firstName}</span>
                  <span>{user?.lastName}</span>
                </div>
                <li className="flex"></li>
                <li className="mx-2">
                  <Link>
                    My Cart
                  </Link>
                </li>
                <li className="mx-2">
                  <Link to='/dashboard/wishlist'>
                    Wishlist
                  </Link>
                </li>
                <li className="mx-2">
                  <Link to='dashboard/my-profile'>
                    Dashboard
                  </Link>
                </li>
                <li className="mx-2">
                <button>
                  Logout
                </button>
                </li>
              </ul>
            </details>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[6px] text-richblack-100">
                Signup
              </button>
            </Link>
            <Link to="/signin">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[6px] text-richblack-100">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
