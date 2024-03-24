import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <Link
      className="card w-80 bg-base-100 shadow-xl"
      to={`/course/${course?._id}`}
    >
      <figure className="w-full h-56">
        <img src={course?.thumbnail} alt="Shoes" className="object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {course?.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{course?.description?.slice(0, 30)}...</p>
        <div className="flex items-center gap-2">
          <span className="text-yellow-5">{3}</span>
          <ReactStars edit={false} value={3} size={24} activeColor="#ffd700" />
          {document.getElementById("where-to-render")}
          <span className="text-richblack-400">
            {" "}
            {course?.ratingAndReviews?.length || 65} Ratings
          </span>
        </div>
        <div className="card-actions items-center ">
          <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          <div className="badge badge-outline">{course?.category?.name}</div>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
