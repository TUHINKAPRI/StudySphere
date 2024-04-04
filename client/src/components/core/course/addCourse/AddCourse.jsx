import RenderSteps from "./RenderSteps"


function AddCourse() {
  return (
    <div className="flex w-full items-start gap-x-6">
    <div className="flex flex-1 flex-col">
      <div className="flex-1 mt-3">
        <RenderSteps />
      </div>
    </div>
   
  </div>
  )
}

export default AddCourse