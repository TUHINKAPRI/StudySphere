import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

function ChipInput({ name, label, register, setValue }) {
  const [chips, setChips] = useState([]);
  const changeHandler = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.trim() == "") {
        toast.error("Enter tags for a course");
        return;
      }
      e.preventDefault();
      setValue("tags", [...chips, e.target.value]);
      setChips([...chips, e.target.value]);
      e.target.value = "";
    }
  };

  useEffect(() => {
    register("tags", { required: true, validate: (value) => value.length > 0 });
  }, []);
  useEffect(() => {
    setValue("tags", [...chips]);
  }, [chips]);

  const deleteHandle = (chipToDelete) => {
    const newChips = chips.filter((ele) => {
      if (ele !== chipToDelete) {
        return ele;
      }
    });
    setChips(newChips);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="coursePrice" className="">
        {label} <sup className="text-pink-200 ">*</sup>
      </Label>
      <Label className="flex ">
        {chips?.map((ele, index) => (
          <div
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
            key={index}
          >
            {ele}

            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => {
                deleteHandle(ele);
              }}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
      </Label>
      <Input
        id="coursePrice"
        type="text"
        placeholder="Course Tag"
        onKeyDown={(e) => changeHandler(e)}
        className="w-full h-[48px] font-bold text-xs bg-richblack-800"
      />
    </div>
  );
}

export default ChipInput;
