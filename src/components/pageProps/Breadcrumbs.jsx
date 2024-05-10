import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Breadcrumbs = ({ prevLocation, title }) => {
  const location = useLocation();

  const [locationPath, setLocationPath] = useState("");

  useEffect(() => {
    setLocationPath(location.pathname.split("/"[1]));
  }, [location]);

  return (
    <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-sm font-normal capitalize flex items-center">
        <span>{prevLocation === "" ? "Home" : prevLocation}</span>

        <span className="capitalize font-semibold">{locationPath}</span>
      </p>
    </div>
  );
};

export default Breadcrumbs;
