import { Link, useNavigate } from "react-router-dom";
import { links } from "../components/HeaderLinks"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setHeaderSubmenu, setProductCategory } from "../redux/nextSlice";
import { MdNavigateNext } from "react-icons/md";

import useDeviceDetect from "../hooks/useDeviceDetect";
import { setSexCategory } from "../redux/nextSlice";

const HeaderSubmenu = ({ closeMenu }) => {

    const navigate = useNavigate();
    const selectedSexCategory = useSelector((state) => state.next.sexCategory)
    const selectedSubheaderMenu = useSelector((state) => state.next.headerSubmenu)

    const [hoveredLink, setHoveredLink] = useState(null);
    const [selectedSublink, setSelectedSublink] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const dispatch = useDispatch();
    const isMobile = useDeviceDetect();
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


    const handleSubmenuChange = (submenuName) => {
        const category = links.find((link) => link.name === submenuName);
        if (!isMobile) {
            dispatch(setProductCategory(null));
            dispatch(setHeaderSubmenu(submenuName));
        } else {
            if (category && !category.submenu) {
                navigate(`${selectedSexCategory}${category.dir}`);
                closeMenu();
            } else if (category && category.submenu) {
                setCurrentCategory(category);
                setSubmenuOpen(true);
                dispatch(setHeaderSubmenu(submenuName));
            }
        }
    };

    const handleSubmenuItemClick = (linkName, sublinkName) => {
        dispatch(setHeaderSubmenu(linkName));
        dispatch(setProductCategory(sublinkName));
    }


    const handleSexChange = (sex) => {
        dispatch(setSexCategory(sex))
    }

    const handleBackClick = () => {
        setCurrentCategory(null);
        setSubmenuOpen(false);
    }

    const handleNextClick = (linkIndex, sublinkIndex) => {
        setSelectedSublink({ linkIndex, sublinkIndex })
    }


    const filteredSublinks = (sublinks) => {
        return sublinks.filter((sublink) => {
            if (selectedSexCategory === 'men') {
                return !sublink.name.toLowerCase().includes('skirts') &&
                    !sublink.name.toLowerCase().includes('clutch bags') &&
                    !sublink.name.toLowerCase().includes('necklaces') &&
                    !sublink.name.toLowerCase().includes('earrings');
            } else if (selectedSexCategory === 'women') {
                return !sublink.name.toLowerCase().includes('mocassins');
            }
            return true;
        })
    }


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
        <div className="w-full flex flex-col md:flex-row  justify-center items-center">
            {!currentCategory && isMobile && (
                    <div ref={burgerMenuRef} className="w-full flex mt-3 flex-col items-center">
                        <div className="w-[90%]">
                            <Link to="/register">
                                <button className="bg-black w-full text-white text-base py-3 px-8 rounded-md hover:bg-gray-800 duration-300">Sign up or Log in</button>
                            </Link>
                        </div>
                        <div className="bg-gray-300 h-[2px] mt-3 mb-3 w-[90%]"></div>
                        <div className="w-[90%] rounded-md flex justify-around bg-stone-300 ">
                            <button onClick={() => handleSexChange("women")} className="border-gray-600 w-full mx-1 my-1 px-8 py-2 text-stone-700 hover:bg-gray-100 shadow-sm rounded-md flex items-center justify-center font-bold">Women</button>
                            <button onClick={() => handleSexChange("men")} className="border-gray-600 w-full mx-1 my-1 rounded-md text-stone-700 hover:bg-gray-100 shadow-sm py-2 px-8 flex items-center justify-center font-bold">Men</button>
                        </div>
                        <h2 className="w-[90%] my-4 px-3 text-lg ">All {`${selectedSexCategory}`}'s </h2>
                        <h2 className="w-[90%] my-2 text-lg px-3 text-red-600">SALE</h2>
                    </div>
                )
            }
            {currentCategory ? (
                <div className="w-[90%] mt-4 flex flex-col">
                    <div className="text-left pl-4 md:cursor-pointer group flex" onMouseEnter={() => handleMouseEnter(null)} onMouseLeave={handleMouseLeave}>
                        <h1 className="py-2 md:hover:scale-110 font-bold mb-2 md:mb-1 md:bg-white w-full text-sm md:text-lg cursor-pointer duration-300 ease-out 0.3s">
                            <Link to={`${selectedSexCategory}/${currentCategory.name}`}>
                            <span onClick={handleBackClick} className="cursor-pointer text-black uppercase font-light text-lg ">
                                All {currentCategory.name}
                            </span>
                            </Link>
                        </h1>
                    </div>
                    {filteredSublinks(currentCategory.sublinks).map((sublink, sublinkIndex) => (
                        <div key={sublinkIndex} className="px-2 text-left md:cursor-pointer group flex">
                            <h1 className="py-4 md:hover:scale-110 font-bold mb-4 md:mb-1 md:bg-white w-full text-sm md:text-lg cursor-pointer duration-300 ease-out 0.3s">
                                <Link to={`${selectedSexCategory}/${currentCategory.name.toLowerCase()}/${sublink.name.toLowerCase()}`} onClick={closeMenu} className="md:hover:text-yellow-600 px-2">
                                    {sublink.name}
                                </Link>
                            </h1>
                        </div>
                    ))}
                </div>
            ) : (
                links.map((link, linkIndex) => (
                    <div className="w-[90%] flex items-center mx-auto" key={linkIndex}>
                        <div className="w-full px-3 text-left md:cursor-pointer group flex" onMouseEnter={() => handleMouseEnter(linkIndex)} onMouseLeave={handleMouseLeave}>
                            <div className="flex justify-between items-center w-full">
                                <div className="py-4 md:py md:hover:text-black text-gray-700 font-light w-full text-sm md:text-base cursor-pointer duration-300 ease-out 0.3s">
                                    {!isMobile ? (
                                        <Link
                                            onClick={() => handleSubmenuChange(link.name)}
                                            to={`${selectedSexCategory?.toLowerCase()}${link.dir}`}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <h1 onClick={() => handleSubmenuChange(link.name)}>
                                            {link.name}
                                        </h1>
                                    )}
                                </div>
                                {isMobile && link.submenu && (
                                    <MdNavigateNext onClick={() => handleNextClick(linkIndex)} className="cursor-pointer text-2xl mb-[2px]" />
                                )}
                            </div>

                            {link.submenu && hoveredLink === linkIndex && (
                                    <div className="absolute top-10 hidden group-hover:block hover:block">
                                        <div className="py-3">
                                            <div className="w-4 h-4 left-4 absolute mt-1 bg-white shadow-lg -z-10 rotate-45"></div>
                                        </div>
                                        <div className="bg-white shadow-lg px-6">
                                            {filteredSublinks(link.sublinks).map((sublink, sublinkIndex) => (
                                                <div key={sublinkIndex} className="flex items-center">
                                                    <h1 className="text-sm text-gray-600 my-3 flex-1">
                                                        <Link 
                                                            to={`${selectedSexCategory}/${link.name.toLowerCase()}/${sublink.name.toLowerCase()}`} className="hover:text-yellow-600 px-2"
                                                            onClick={() => handleSubmenuItemClick(link.name, sublink.name)}
                                                        >
                                                            {sublink.name}
                                                        </Link>
                                                    </h1>
                                                </div>
                                            ))}
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

export default HeaderSubmenu
