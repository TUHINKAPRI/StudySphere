import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchProfileDetails, updateProfilePicture } from "@/services/slices/profileSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function AccountInfo() {
  const dispatch = useDispatch();
  const { profileData, isLoading } = useSelector((state) => state.profile);
  const [img, setImg] = useState();
  const fd=new FormData();
  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);
  return (
    <div>
      <div className=" max-w-2xl mt-6 mx-auto">
        <div>
          <p className="font-bold mb-3 text-sm">Accounts :</p>
          <form
            action=""
            className="w-full text-richblue-5 flex flex-col gap-4"
          >
            <Input
              type="text"
              placeholder=""
              className="w-full h-[48px] font-bold text-xs bg-richblack-800"
              defaultValue={profileData?.firstName}
            />
            <Input
              type="text"
              placeholder="lastName"
              className="w-full h-[48px] font-bold text-xs bg-richblack-800"
              defaultValue={profileData?.lastName}
            />
            <Input
              type="text"
              placeholder="lastName"
              className="w-full h-[48px] font-bold text-xs bg-richblack-800"
              defaultValue={profileData?.email}
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
        <div>
          <p className="font-bold mb-3 text-sm">Profile picture :</p>
          <div className="border rounded-md flex  ">
            <img
              src={img?(URL.createObjectURL(img)):(profileData?.image)}
              
              alt=" profile pic "
              className="h-[200px] mx-auto"
            />
          </div>
          <Input
              type="file"
              placeholder=""
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
              className="w-full h-[48px]  font-bold mt-4 text-xs bg-richblack-800"
            />
          <div className="w-full my-5 ">
            <Button
              variant="outline"
              onClick={()=>{
                fd.append('profilePicture',img);
                dispatch(updateProfilePicture(fd))
              }}
              disabled={img?(isLoading?(true):(false)):(true)}
              className="w-2/12 bg-richblack-800"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </div>
        </div>
        <Separator className="my-4 border bg-richblack-900" />
        <div>
          <p className="font-bold mb-3 text-sm">Change Password :</p>
          <form
            action=""
            className="w-full text-richblue-5 flex flex-col gap-4"
          >
            <Input
              type="text"
              placeholder="Old password"
              className="w-full h-[48px] font-bold text-xs bg-richblack-800"
            />
            <Input
              type="text"
              placeholder=" New password"
              className="w-full h-[48px] font-bold text-xs bg-richblack-800"
            />
            <Input
              type="text"
              placeholder="Confirm password"
              className="w-full h-[48px] font-bold text-xs bg-richblack-800"
            />
            <div className="w-full mb-5 ">
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
        <Separator className="mb-5 border bg-richblack-900" />
      </div>
    </div>
  );
}

export default AccountInfo;
