import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { RiDeleteBin6Line } from "react-icons/ri"
import { HiClock } from "react-icons/hi";
import Spinner from "./Spinner";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom";

function Tables({ courses }) {
  const { isLoading } = useSelector((state) => state.course);
  const navigate=useNavigate()
  console.log(courses);
  if (isLoading) {
    return (
      <div className="flex  justify-center mt-40">
        <Spinner />
      </div>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] text-left">Course Name</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">StudentJoined</TableHead>
          <TableHead className="text-center">Action</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses?.map((course, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-left">
              {course?.name}
            </TableCell>
            <TableCell className=" text-center"> ₹ {course?.price}</TableCell>
            <TableCell className="text-center">
              {course?.studentJoined?.length}
            </TableCell>
            <TableCell className=" text-center">
              <div className="flex justify-center gap-4">
                <button
                  disabled={isLoading}
                  onClick={() => {
                    navigate(`/dashboard/edit-course/${course._id}`);
                  }}
                  title="Edit"
                  className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                >
                  <FiEdit2 size={16} />
                </button>
                <button
                  disabled={isLoading}
                  onClick={() => {}}
                  title="Delete"
                  className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                >
                  <RiDeleteBin6Line size={16} />
                </button>
              </div>
            </TableCell>
            <TableCell className="  flex justify-center ">
              {course?.status === "draft" ? (
                <p className="flex  w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                  <HiClock size={14} />
                  Drafted
                </p>
              ) : (
                <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                  <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                    <FaCheck size={8} />
                  </div>
                  Published
                </p>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Tables;
