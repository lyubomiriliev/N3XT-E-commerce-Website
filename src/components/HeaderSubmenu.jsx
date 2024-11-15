import { Link, useNavigate } from "react-router-dom";
import { links } from "../components/HeaderLinks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setHeaderSubmenu, setProductCategory } from "../redux/nextSlice";
import { MdNavigateNext } from "react-icons/md";

import useDeviceDetect from "../hooks/useDeviceDetect";
import { setSexCategory } from "../redux/nextSlice";

const HeaderSubmenu = ({ closeMenu }) => {
  const navigate = useNavigate();

  const selectedSexCategory = useSelector((state) => state.next.sexCategory);
  const dispatch = useDispatch();
  const isMobile = useDeviceDetect();

  const [hoveredLink, setHoveredLink] = useState(null);
  const [selectedSublink, setSelectedSublink] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const burgerMenuRef = useRef();

  const handleMouseEnter = (index) => {
    if (!isMobile) {
      setHoveredLink(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredLink(null);
    }
  };

  const handleCategoryNavigation = (category) => {
    dispatch(setHeaderSubmenu(category));
    dispatch(setProductCategory(null));
    navigate(`/${selectedSexCategory}/${category.toLowerCase()}`);
  };

  const handleSubmenuChange = (submenuName) => {
    const category = links.find((link) => link.name === submenuName);
    if (category && category.submenu) {
      setCurrentCategory(category);
      setSubmenuOpen(true);
      dispatch(setHeaderSubmenu(submenuName));
    }
  };

  const handleSubmenuItemClick = (linkName, sublinkName) => {
    dispatch(setHeaderSubmenu(linkName));
    dispatch(setProductCategory(sublinkName));
  };

  const handleSexChange = (sex) => {
    dispatch(setSexCategory(sex));
  };

  const handleBackClick = () => {
    setCurrentCategory(null);
    setSubmenuOpen(false);
  };

  const handleNextClick = (linkIndex, sublinkIndex) => {
    setSelectedSublink({ linkIndex, sublinkIndex });
  };

  const filteredSublinks = (sublinks) => {
    return sublinks.filter((sublink) => {
      if (selectedSexCategory === "men") {
        return (
          !sublink.name.toLowerCase().includes("skirt") &&
          !sublink.name.toLowerCase().includes("clutch bags") &&
          !sublink.name.toLowerCase().includes("necklace") &&
          !sublink.name.toLowerCase().includes("earring")
        );
      } else if (selectedSexCategory === "women") {
        return !sublink.name.toLowerCase().includes("mocassins");
      }
      return true;
    });
  };

  const handleSignUpClick = () => {
    navigate("/register");
    closeMenu();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (burgerMenuRef.current && !burgerMenuRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [burgerMenuRef]);

  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-center items-center">
        {!currentCategory && isMobile && (
          <div
            ref={burgerMenuRef}
            className="w-full flex mt-3 flex-col items-center"
          >
            <div onClick={handleSignUpClick} className="w-[90%]">
              <button className="bg-black w-full text-white text-base py-3 px-8 rounded-md hover:bg-gray-800 duration-300">
                Sign up or Log in
              </button>
            </div>
            <div className="bg-gray-300 h-[2px] mt-3 mb-3 w-[90%]"></div>
            <div className="w-[90%] rounded-md flex justify-around bg-stone-300 ">
              <button
                onClick={() => handleSexChange("women")}
                className="w-full mx-1 my-1 px-8 py-2 text-stone-700 hover:bg-gray-100 shadow-sm rounded-md flex items-center justify-center font-bold"
              >
                Women
              </button>
              <button
                onClick={() => handleSexChange("men")}
                className="w-full mx-1 my-1 px-8 py-2 text-stone-700 hover:bg-gray-100 shadow-sm rounded-md flex items-center justify-center font-bold"
              >
                Men
              </button>
            </div>
            <h2 className="w-[90%] py-4 px-3 text-lg font-bold uppercase">
              All {`${selectedSexCategory}`}'s Products{" "}
            </h2>
          </div>
        )}
        {currentCategory ? (
          <div className="w-[90%] mt-4 flex flex-col">
            <div
              className="text-left pl-4 md:cursor-pointer group flex"
              onMouseEnter={() => handleMouseEnter(null)}
              onMouseLeave={handleMouseLeave}
            >
              <h1 className="py-2 md:hover:scale-110 font-bold mb-2 md:mb-1 md:bg-white w-full text-sm md:text-lg cursor-pointer duration-300 ease-out 0.3s">
                <Link to={`${selectedSexCategory}/${currentCategory.name}`}>
                  <span
                    onClick={handleBackClick}
                    className="cursor-pointer text-black uppercase font-light text-lg "
                  >
                    All {currentCategory.name}
                  </span>
                </Link>
              </h1>
            </div>
            {filteredSublinks(currentCategory.sublinks).map(
              (sublink, sublinkIndex) => (
                <div
                  key={sublinkIndex}
                  className="px-2 text-left md:cursor-pointer group flex"
                >
                  <h1 className="py-4 md:hover:scale-110 font-bold mb-4 md:mb-1 md:bg-white w-full text-sm md:text-lg cursor-pointer duration-300 ease-out 0.3s">
                    <Link
                      to={`${selectedSexCategory}/${currentCategory.name.toLowerCase()}/${sublink.name.toLowerCase()}`}
                      onClick={closeMenu}
                      className="md:hover:text-indigo-600 px-2"
                    >
                      {sublink.name}
                    </Link>
                  </h1>
                </div>
              )
            )}
          </div>
        ) : (
          links.map((link, linkIndex) => (
            <div className="w-[90%] flex items-center mx-auto" key={linkIndex}>
              <div
                className="w-full px-3 text-left md:cursor-pointer group flex"
                onMouseEnter={() => handleMouseEnter(linkIndex)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-1 justify-between items-center">
                  <div className="py-4 md:py md:hover:text-black text-gray-700  font-light w-full flex items-center justify-between text-sm md:text-base cursor-pointer duration-300 ease-out 0.3s">
                    <div
                      className="text-gray-600 hover:text-indigo-600"
                      onClick={() => handleCategoryNavigation(link.name)}
                    >
                      {link.name}
                    </div>
                    <div
                      onClick={() => handleSubmenuChange(link.name)}
                      className="w-full flex justify-end px-2"
                    >
                      {isMobile && link.submenu && (
                        <div className="h-10 w-1/3 justify-end items-center flex">
                          <MdNavigateNext className="cursor-pointer text-2xl mb-[2px]" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {link.submenu && hoveredLink === linkIndex && (
                  <div className="absolute top-10 hidden group-hover:block hover:block">
                    <div className="py-3">
                      <div className="w-4 h-4 left-4 absolute mt-1 bg-white shadow-lg -z-10 rotate-45"></div>
                    </div>
                    <div className="bg-white shadow-lg px-6">
                      {filteredSublinks(link.sublinks).map(
                        (sublink, sublinkIndex) => (
                          <div key={sublinkIndex} className="flex items-center">
                            <h1 className="text-sm text-gray-600 my-3 flex-1">
                              <Link
                                to={`${selectedSexCategory}/${link.name.toLowerCase()}/${sublink.name.toLowerCase()}`}
                                className="hover:text-indigo-600 px-2"
                                onClick={() =>
                                  handleSubmenuItemClick(
                                    link.name,
                                    sublink.name
                                  )
                                }
                              >
                                {sublink.name}
                              </Link>
                            </h1>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default HeaderSubmenu;
