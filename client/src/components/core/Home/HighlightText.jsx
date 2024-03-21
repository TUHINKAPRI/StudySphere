export default function HighlightText({ text }) {
  return (
    <span className=" ms-2 bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
      {text}
    </span>
  );
}
