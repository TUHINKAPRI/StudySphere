import { Button } from "@/components/ui/button";
import { VscAdd } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchInstructorCourse } from "@/services/slices/courseSlice";
import Tables from "@/components/common/Table";
function MyCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state?.course);
  console.log(courses);
  useEffect(() => {
    dispatch(fetchInstructorCourse());
  }, []);
  return (
    <div className="max-w-4xl mt-6 mx-auto  ">
      <div className=" flex items-center justify-between">
        <h1 className="text-2xl font-medium text-richblack-5"> Courses </h1>
        <Button
          variant="outline"
          className="bg-richblack-800 px-6 "
          onClick={() => navigate("/dashboard/add-course")}
        >
          <div className="flex items-center gap-2">
            <span>Add courses</span>
            <VscAdd className="mt-1" />
          </div>
        </Button>
      </div>
      <div className="w-10/12  mx-auto">
        {courses && <Tables courses={courses} />}
      </div>
    </div>
  );
}

export default MyCourses;
