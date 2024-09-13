const ToggleMenuIcon = ({ open, setOpen, onTop }) => {
  return (
    <div
      onClick={() => {
        setOpen(!open);
      }}
      className="absolute right-2 top-4 flex cursor-pointer flex-col items-center justify-center text-3xl md:hidden"
    >
      <div
        className={`genericHambugerLine ${
          open ? "translate-y-[10px] rotate-45" : "opacity-100"
        } bg-white`}
      ></div>
      <div
        className={`genericHambugerLine ${open ? "opacity-0" : "opacity-100"} bg-white`}
      ></div>
      <div
        className={`genericHambugerLine ${
          open ? "-translate-y-[10px] -rotate-45" : "opacity-100"
        } bg-white`}
      ></div>
    </div>
  );
};
export default ToggleMenuIcon;
