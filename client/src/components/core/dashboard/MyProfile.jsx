import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchProfileDetails, updateProfile } from "@/services/slices/profileSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

function MyProfile() {
  const dispatch = useDispatch();
  const { profileData, isLoading } = useSelector((state) => state.profile);
  const {
    register,
    handleSubmit,
  } = useForm();
  const submitHandler=(data)=>{
    dispatch(updateProfile(data))
  }
  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, []);
  return (
    <div>
      <div className=" max-w-2xl mt-6 mx-auto">
        <div>
          <p className="font-bold mb-3 text-sm">Aditional details :</p>
          <form
            action=""
            className="w-full text-richblue-5 flex flex-col gap-4"
            onSubmit={handleSubmit(submitHandler)}
          >
            <Input
              type="number"
              placeholder="Contact Number"
              className="w-full h-[48px] font-bold text-xs bg-richblack-800"
              {...register('contactNumber')}
              defaultValue={
                profileData?.aditionalDetails[0].contactNumber
                  ? profileData?.aditionalDetails[0].contactNumber
                  : ""
              }
            />
            <Input
              type="date"
              placeholder="lastName"
              className="w-full h-[48px] font-bold text-xs bg-richblack-800"
              {...register('dateOfBirth')}
              defaultValue={
                profileData?.aditionalDetails[0].dateOfBirth
                  ? profileData?.aditionalDetails[0].dateOfBirth
                  : ""
              }
            />
            <Textarea
              placeholder="About ME"
              className="w-full h-[110px] font-bold text-xs bg-richblack-800"
              {...register('about')}
              defaultValue={
                profileData?.aditionalDetails[0].about
                  ? profileData?.aditionalDetails[0].about
                  : ""
              }
            />
            <Input
              type="text"
              placeholder="Gender"
              className="w-full h-[48px] font-bold text-xs bg-richblack-800"
              {...register('gender')}
              defaultValue={
                profileData?.aditionalDetails[0].gender
                  ? profileData?.aditionalDetails[0].gender
                  : ""
              }
            />

            <div className="w-full ">
              <Button
                variant="outline"
                disabled={isLoading ? true : false}
                className="w-2/12 bg-richblack-800"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </div>
        <Separator className="my-4 border bg-richblack-900" />
      </div>
    </div>
  );
}

export default MyProfile;
