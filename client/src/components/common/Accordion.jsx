export default function Accrodion({ course }) {
  return (
    <div>
      {course?.map((ele, i) => {
        console.log(ele?.subSection?.length);
        return (
          <>
            {ele?.subSection?.length > 0 ? (
              <div className="join join-vertical w-full " key={i}>
                <div className="collapse collapse-arrow join-item border border-base-300">
                  <input type="checkbox" name="my-accordion-4" />
                  <div className="collapse-title flex justify-between font-semibold">
                    <div>
                      <span className="mx-2">Module {i + 1}.</span>
                      <span>{ele?.sectionName}</span>
                    </div>
                    <div>{ele?.subSection?.length} lectures</div>
                  </div>
                  <div className="collapse-content">
                    {ele?.subSection?.map((sub, i) => {
                      return (
                        <div key={i}>
                          <div className="flex justify-between">
                            <div className="flex gap-4 ">
                              <VideoIcon />
                              <p>{sub?.title}</p>
                            </div>
                            <div className="">{sub?.timeDuration}</div>
                          </div>

                          <p className="">{sub?.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  );
}

function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}

{
  /* <div className="flex items-center gap-2">
<VideoIcon className="w-6 h-6" />
<div className="grid gap-1">
  <h3 className="font-semibold">
    Module 1: Introduction to Quantum
  </h3>
  <p className="text-sm text-gray-500 dark:text-gray-400">
    An overview of quantum mechanics and the principles of quantum
    computing.
  </p>
</div>
</div> */
}
