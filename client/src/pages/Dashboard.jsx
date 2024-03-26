import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const [currentPath, setCurerentPath] = useState();
  useEffect(() => {
    const path = location.pathname.split("/");
    setCurerentPath(path[path.length - 1]);
  }, [location.pathname]);
  return (
    <div className="w-full">
      <div className="bg-richblack-800 w-full   h-[150px]">
        <div className="max-w-6xl pt-10   mx-auto">
          <h1 className="text-4xl font-bold mb-5">Dashboard</h1>
          <div className="font-bold text-sm flex gap-4 mt-9">
            <Link
              to="/dashboard/my-profile"
              className={currentPath === "my-profile" ? "text-blue-400" : null}
            >
              {" "}
              My profile
            </Link>
            <NavLink
              to="/dashboard/my-learning  "
              className={currentPath === "my-learning" ? "text-blue-400" : null}
            >
              My Learning
            </NavLink>
            <Link
              to="/dashboard/wishlist"
              className={currentPath === "wishlist" ? "text-blue-400" : null}
            >
              Wishlist
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
