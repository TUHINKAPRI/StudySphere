import Footer from "@/components/common/Footer";
import Sidebar from "@/components/core/dashboard/Sidebar";
import { useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const [path, setPath] = useState();

  console.log(path);
  useEffect(() => {
    setPath(
      location?.pathname?.split("/")[location.pathname?.split("/")?.length - 1]
    );
  }, [location.pathname]);
  return (
    <div>
      <div className=" max-w-6xl mt-6 min-h-screen border mx-auto grid grid-cols-[215px,auto] ">
        <div className="border-e">
          <Sidebar />
        </div>
        <div>
          <div className="h-[70px] border-b-[1px]">
            <div className="text-center mt-5 text-2xl font-bold">
              {path === "account-info" && <>Account Details</>}
              {path === "my-profile" && <>Your Profile</>}
              {path === "mycourse" && <>Your Course</>}
              {path === "wishlist" && <>Wishlist</>}
              {path === "mycourses" && <>My courses</>}
              {path==='add-course' && <>Add a new course</>}
              {path==='instructor' && <>Instructor</>}
            </div>
          </div>
          <Outlet />
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
