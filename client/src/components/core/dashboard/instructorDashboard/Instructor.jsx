import { instructorDashboardInfo } from "@/services/slices/profileSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Instructor() {
  const dispatch = useDispatch();
  const { instructorData } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  console.log(instructorData);
  console.log(user);
  useEffect(() => {
    dispatch(instructorDashboardInfo());
  }, []);
  return (
    <div className="my-5">
      <div className="space-y-2 mx-auto ">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-richblack-5">
            Hi {user?.firstName} 👋
          </h1>
          <p className="font-medium text-richblack-200">
            Lets start something new
          </p>
        </div>
      </div>
      {instructorData?.course?.length > 0 ? (
        <div>
          <div className="my-4 flex h-[450px] space-x-4">
            {instructorData?.totalAmountOfInstructor > 0 ||
            instructorData.totalStudentOfInstructor > 0 ? (
              <>
                <div>segfw chart</div>
              </>
            ) : (
              <div className="flex-1  rounded-sm border-t-[1px] border-r-[1px] border-b-[1px] p-6">
                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                <p className="mt-4 text-xl font-medium text-richblack-50">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}

            <div className="flex min-w-[250px] flex-col rounded-sm border-t-[1px] border-b-[1px] border-l-[1px] p-6">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-richblack-200">Total Courses</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {instructorData?.course?.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Students</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {instructorData?.totalStudentOfInstructor}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Income</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    Rs. {instructorData?.totalAmountOfInstructor}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" border-t-[1px] rounded-sm p-6">
            {/* Render 3 courses */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/mycourses">
                <p className="text-xs font-semibold text-yellow-50">View All</p>
              </Link>
            </div>
            <div className="my-4 flex items-start space-x-6">
              {instructorData?.course?.slice(0, 3).map((course, i) => (
                <div key={i} className="w-1/3">
                  {console.log(course)}
                  <img
                    src={course?.course?.thumbnail}
                    alt={course?.course?.name}
                    className="h-[201px] w-full rounded-md object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-richblack-50">
                      {course?.course?.name}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-richblack-300">
                        {course?.totalStudent} students
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        |
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        Rs. {course?.course?.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-richblack-5">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Instructor;

//  {/* <InstructorChart courses={instructorData} />  */}
