import { AlertProps } from "~/types/types";

const Alert = ({ message, type, open, setOpen }: AlertProps) => {
  let alertTypeHeader = "bg-red-500";
  let alertTypeBody = "bg-red-100";

  type === "success"
    ? ((alertTypeHeader = "bg-green-500"),
      (alertTypeBody = "bg-green-100 border-green-400 text-green-700"))
    : ((alertTypeHeader = "bg-red-500"),
      (alertTypeBody = "bg-red-100 border-red-400 text-red-700"));

  setTimeout(() => {
    setOpen(false);
  }, 3000);

  return (
    <div
      role="alert"
      className={`flex flex-col w-1/4 transition-all z-10 ${open ? "scale-100 opacity-100" : "scale-120 opacity-0"}`}
    >
      <div
        className={`${alertTypeHeader} + text-white font-bold rounded-t px-4 py-2`}
      >
        {type === "success" ? "Success" : "Error"}
      </div>
      <span className="py-0" />
      <div
        className={`${alertTypeBody} + border border-t-0 rounded-b px-4 py-2`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};
export default Alert;
