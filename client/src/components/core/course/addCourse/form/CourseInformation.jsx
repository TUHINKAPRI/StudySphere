import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAllCategory } from "@/services/slices/categorySlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ChipInput from "../ChipInput";

const CourseInformation = () => {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.categories);
  const {
    register,
    handleSubmit,
    setValue,
    getValue,
    watch,
    formState: { errors },
  } = useForm();
  const submitHandler = (data, e) => {
    e.preventDefault();
    console.log(data);
  };
  useEffect(() => {
    dispatch(fetchAllCategory());
  }, []);
  return (
    <>
      <form
        className="max-w-3xl mx-auto  text-richblue-5 flex flex-col gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        {/* course name */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="courseName" className="">
            Course Title <sup className="text-pink-200 ">*</sup>
          </Label>
          <Input
            id="courseName"
            type="text"
            {...register("name", { required: true })}
            placeholder="Course Title"
            className="w-full h-[48px] font-bold text-xs bg-richblack-800"
          />
          <Label className="">
            {errors?.name && <p>Course name is required</p>}
          </Label>
        </div>
        {/* course description */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="courseDescription" className="">
            Course Description <sup className="text-pink-200 ">*</sup>
          </Label>
          <Input
            id="courseDescription"
            type="text"
            {...register("description", { required: true })}
            placeholder="Course Description"
            className="w-full h-[48px] font-bold text-xs bg-richblack-800"
          />
          <Label className="">
            {errors?.description && <p>Course description is required</p>}
          </Label>
        </div>
        {/* course price */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="coursePrice" className="">
            Course Price <sup className="text-pink-200 ">*</sup>
          </Label>
          <Input
            id="coursePrice"
            type="text"
            {...register("price", { required: true })}
            placeholder="Course Price"
            className="w-full h-[48px] font-bold text-xs bg-richblack-800"
          />
          <Label className="">
            {errors?.price && <p>Course price is required</p>}
          </Label>
        </div>
        {/* course category */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="coursePrice" className="">
            Course Category <sup className="text-pink-200 ">*</sup>
          </Label>
          <Select
            className="bg-richblack-800  border"
            {...register("category", { required: true })}
            onValueChange={(e) => {
              setValue("category", e);
            }}
          >
            <SelectTrigger className="w-full h-[48px] font-bold text-xs bg-richblack-800">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-richblack-800 w-6/12   mx-auto">
              <SelectGroup>
                {isLoading ? (
                  <div className="w-full justify-center">
                    <Spinner size={4} />
                  </div>
                ) : (
                  <>
                    {categories?.map((category, index) => (
                      <SelectItem value={category?._id} key={index}>
                        {category?.name}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label className="">
            {errors?.category && <p>Course category is required</p>}
          </Label>
        </div>
        <div>
          <ChipInput
            name="tag"
            label="Tags"
            register={register}
            setValue={setValue}
          />
          <Label>{errors?.tags && <p>Tags is required</p>}</Label>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="courseDescription" className="">
            whatWeWillLearn <sup className="text-pink-200 ">*</sup>
          </Label>
          <Input
            id="courseDescription"
            type="text"
            {...register("whatWeWillLearn", { required: true })}
            placeholder="Course whatWeWillLearn section"
            className="w-full h-[48px] font-bold text-xs bg-richblack-800"
          />
          <Label className="">
            {errors?.description && <p>This section is required</p>}
          </Label>
        </div>
        <div className="w-full ">
          <Button
            variant="outline"
            type="submit"
            // disabled={isLoading ? true : false}
            className="w-2/12 bg-richblack-800"
          >
            {/* {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default CourseInformation;
