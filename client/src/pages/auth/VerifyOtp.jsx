import { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../services/slices/authSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { user, isLoading, redirectTo, userFormData } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const clickHandler = () => {
    if (!userFormData) {
      toast.error("All fields is required");
      return;
    }
    dispatch(signup({ ...userFormData, otp: otp }));
  };
  if (redirectTo) {
    navigate(`${redirectTo}`);
  }

  const style = {
    margin: "0.5rem",
    border: "1px solid #e5e7eb",
    height: "2.5rem",
    width: "2.5rem",
    borderRadius: "0.375rem",
    text: "white",
  };
  return (
    <div>
      <div className="h-screen py-20 px-3">
        <div className="container mx-auto">
          <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
              <div className=" bg-richblack-800 h-70 py-3 rounded text-center">
                <h1 className="text-2xl font-bold">OTP Verification</h1>
                <div className="flex flex-col mt-4">
                  <span>Enter the OTP you received at</span>
                  <span className="font-bold">{user?.email}</span>
                </div>
                <div
                  id="otp"
                  className="flex w-full flex-row justify-center text-center px-2 mt-5"
                >
                  <OtpInput
                    inputStyle={style}
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>

                <div className="flex flex-col items-center mt-3 space-y-3">
                  <div className="w-6/12">
                    <button
                      onClick={clickHandler}
                      className=" btn flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-richblack-500 border-none text-white text-sm shadow-sm"
                    >
                      {isLoading && (
                        <span className="loading loading-spinner"></span>
                      )}
                      Verify Account
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didnt recieve code?</p>{" "}
                    <Link
                      className="flex flex-row items-center text-blue-600"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
