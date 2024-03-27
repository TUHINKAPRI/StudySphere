import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const sidebarNavLink = [
    { name: "Profile", path: "/dashboard/my-profile", accountType: "All" },
    {
      name: "Enrolled courses",
      path: "/dashboard/enrolled-courses",
      accountType: "Student",
    },
    {
      name: "Accout info",
      path: "/dashboard/account-info",
      accountType: "All",
    },
    { name: "Wishlist", path: "/dashboard/wishlist", accountType: "Student" },
    {
      name: "Instructor",
      path: "/dashboard/instructor",
      accountType: "Instructor",
    },
    {
      name: "Add course",
      path: "dashboard/add-course",
      accountType: "Instructor",
    },
    {
      name: "My courses",
      path: "dashboard/mycourses",
      accountType: "Instructor",
    },
    
  ];
  return (
    <div className="container">
      <div className="flex flex-col items-center ">
        <div className="w-[120px] my-5 mx-auto h-[120px]">
          <AspectRatio ratio={16 / 1}>
            <img
              src={user?.image}
              alt="Image"
              className="rounded-full object-cover h-[120px] w-[120px]  "
            />
          </AspectRatio>
        </div>
        <p className="font-bold">
          <span>{user?.firstName} </span>
          <span>{user?.lastName}</span>
        </p>
      </div>
      <div className=" font-semibold  mt-3">
        {sidebarNavLink?.map((ele) => {
         if(ele?.accountType==='All' || ele?.accountType===user?.accountType){
            return (
              <>
                <NavLink to={`${ele?.path}`} className="flex   items-center hover:bg-richblack-500">
                <span className="px-4 py-1">{ele?.name}</span>
                </NavLink>
              </>
            )
         }
        })}

        {/* <NavLink
          to="/dashboard/my-profile"
          className="flex   items-center hover:bg-richblack-500"
        >
          <span className="px-4 py-1">Profile</span>
        </NavLink>
        <NavLink
          to="/dashboard/enrolled-courses"
          className="flex   items-center hover:bg-richblack-500"
        >
          <span className="px-4 py-1">Enrolled courses</span>
        </NavLink>

        <NavLink
          to="/dashboard/account-info"
          className="flex   items-center hover:bg-richblack-500"
        >
          <span className="px-4 py-1">Accout info</span>
        </NavLink>
        <NavLink
          to="/dashboard/wishlist"
          className="flex   items-center hover:bg-richblack-500"
        >
          <span className="px-4 py-1">Wishlist</span>
        </NavLink> */}
        <div className="flex  font-semibold  items-center hover:bg-richblack-500">
          <span className="px-4 py-1">Close account</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
