import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <Link
      className="card text-sm rounded-md  bg-base-100 shadow-xl"
      style={{ width: "250px", height: "300px" }}
      to={`/course/${course?._id}`}
    >
      <figure className="w-full" style={{ height: "150px" }}>
        <img src={course?.thumbnail} alt="Shoes" className="object-cover" />
      </figure>
      <div className="ms-4 mt-4" style={{ height: "150px" }}>
        <h2 className="card-title mb-2">
          {course?.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p className="mb-2">{course?.description?.slice(0, 30)}...</p>
        <div className="flex items-center gap-2">
          <span className="text-yellow-5">{3}</span>
          <ReactStars edit={false} value={3} size={16} activeColor="#ffd700" />
          {document.getElementById("where-to-render")}
          <span className="text-richblack-400">
            {" "}
            {course?.ratingAndReviews?.length || 65} Ratings
          </span>
        </div>
        <div className="card-actions my-3 flex justify-between me-4 items-center ">
          <p className=" text-lg text-richblack-5">Rs. {course?.price}</p>
          <div className="badge badge-outline">{course?.category?.name}</div>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
