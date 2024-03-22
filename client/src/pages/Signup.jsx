import { Link } from "react-router-dom";
import signImg from "../assets/Images/signup.webp";
import { useForm } from "react-hook-form";
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="flex w-full max-w-sm mx-auto overflow-hidden  rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2 ">
          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>
          <a
            href="#"
            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Signup with Google
            </span>
          </a>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4" />
            <div className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 ">
              or signup with email
            </div>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4" />
          </div>
          <div>
            {/* form */}
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="flex gap-3">
                <div className="mt-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="LoggingEmailAddress"
                  >
                    <div className="flex justify-between">
                      <span>FirstName</span>
                      <span>
                        {errors.firstName && <p className="">Required field</p>}
                      </span>
                    </div>
                  </label>
                  <input
                    id="LoggingEmailAddress"
                    {...register("firstName", { required: true })}
                    className="block w-full px-4 py-2 text-gray-700 bg-richblack-800 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                  />
                </div>
                <div className="mt-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="LoggingEmailAddress"
                  >
                    <div className="flex justify-between">
                      <span>LastName</span>
                      <span>
                        {errors.lastName && <p className="">Required field</p>}
                      </span>
                    </div>
                  </label>
                  <input
                    id="LoggingEmailAddress"
                    {...register("lastName", { required: true })}
                    className="block w-full px-4 py-2 text-gray-700 bg-richblack-800 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="LoggingEmailAddress"
                >
                  <div className="flex justify-between">
                    <span>Email Address</span>
                    <span>
                      {errors.email && <p className="">Email is required</p>}
                    </span>
                  </div>
                </label>
                <input
                  id="LoggingEmailAddress"
                  {...register("email", { required: true })}
                  className="block w-full px-4 py-2 text-gray-700 bg-richblack-800 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                />
              </div>
              <div className="mt-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="loggingPassword"
                >
                  <div className="flex justify-between ">
                    <span>Password</span>
                    <span>
                      {errors.password && (
                        <p className="">Password is required</p>
                      )}
                    </span>
                  </div>
                </label>

                <input
                  id="loggingPassword"
                  {...register("password", { required: "true" })}
                  className="block w-full px-4 py-2 text-gray-700 bg-richblack-800 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                />
              </div>
              <div className="mt-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="loggingPassword"
                >
                  <div className="flex justify-between ">
                    <span>Confirm-Password</span>
                    <span>
                      {errors.confirmPassword && (
                        <p className="">confirm-Password is required</p>
                      )}
                    </span>
                  </div>
                </label>

                <input
                  id="loggingPassword"
                  {...register("confirmPassword", { required: "true" })}
                  className="block w-full px-4 py-2 text-gray-700 bg-richblack-800 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                />
              </div>
              <div className="mt-4">
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-richblack-700 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            <Link
              to="/signin"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign In
            </Link>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
          </div>
        </div>
        <div className="flex justify-end items-center  ">
          <img src={signImg} alt="SignIn image" className="w-9/12 rounded" />
        </div>
       
      </div>
    </div>
  );
}

export default Signup;
