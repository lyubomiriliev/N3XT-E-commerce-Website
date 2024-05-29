import { Link } from "react-router-dom";
import { links } from "../components/HeaderLinks"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setHeaderSubmenu, setProductCategory } from "../redux/nextSlice";
import { MdNavigateNext } from "react-icons/md";

import useDeviceDetect from "../hooks/useDeviceDetect";

const HeaderSubmenu = ({ closeMenu }) => {

    const selectedSexCategory = useSelector((state) => state.next.sexCategory)
    const [hoveredLink, setHoveredLink] = useState(null);
    const [selectedSublink, setSelectedSublink] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const dispatch = useDispatch();
    const isMobile = useDeviceDetect();

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
        if (!isMobile) {
            dispatch(setProductCategory(null))
            dispatch(setHeaderSubmenu(submenuName))
            closeMenu()
        } else {
            const category = links.find((link) => link.name === submenuName);
            setCurrentCategory(category)
        }

    }

    const handleBackClick = () => {
        setCurrentCategory(null);
    }

    const handleNextClick = (linkIndex, sublinkIndex) => {
        setSelectedSublink({ linkIndex, sublinkIndex })
    }

    const handleNestedMenuClick = () => {
        closeMenu();
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

    return (
        <>
            {currentCategory ? (
                <div>
                    <div className="px-3 text-left md:cursor-pointer group flex" onMouseEnter={() => handleMouseEnter(null)} onMouseLeave={handleMouseLeave}>
                        <h1 className="py-4 md:hover:scale-110 font-bold mb-4 md:mb-1 md:bg-white w-full text-sm md:text-lg cursor-pointer duration-300 ease-out 0.3s">
                            <span onClick={handleBackClick} className="cursor-pointer text-gray-400">
                                Back to {currentCategory.name}
                            </span>
                        </h1>
                    </div>
                    {filteredSublinks(currentCategory.sublinks).map((sublink, sublinkIndex) => (
                        <div key={sublinkIndex} className="px-3 text-left md:cursor-pointer group flex">
                            <h1 className="py-4 md:hover:scale-110 font-bold mb-4 md:mb-1 md:bg-white w-full text-sm md:text-lg cursor-pointer duration-300 ease-out 0.3s">
                                <Link to={`${selectedSexCategory}/${currentCategory.name.toLowerCase()}/${sublink.name.toLowerCase()}`} className="md:hover:text-yellow-600 px-2">
                                    {sublink.name}
                                </Link>
                            </h1>
                        </div>
                    ))}
                </div>
            ) : (
                links.map((link, linkIndex) => (
                    <div key={linkIndex}>
                        <div className="px-3 text-left md:cursor-pointer group flex" onMouseEnter={() => handleMouseEnter(linkIndex)} onMouseLeave={handleMouseLeave}>
                            <div className="flex justify-between items-center w-full">
                                <h1 className="py-4 md:hover:scale-110 font-bold mb-4 md:mb-1 md:bg-white w-full text-sm md:text-lg cursor-pointer duration-300 ease-out 0.3s">
                                    {link.name ? (
                                        <Link
                                            onClick={() => handleSubmenuChange(link.name)}
                                            to={`${selectedSexCategory?.toLowerCase()}${link.dir}`}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <Link to={link.dir}>{link.name}</Link>
                                    )}
                                </h1>
                                {isMobile && link.submenu && (
                                    <MdNavigateNext onClick={() => handleNextClick(linkIndex)} className="cursor-pointer text-2xl mb-3" />
                                )}
                            </div>
                            {link.submenu && hoveredLink === linkIndex && (
                                <div>
                                    <div className="absolute top-12 hidden group-hover:block hover:block">
                                        <div className="py-3">
                                            <div className="w-4 h-4 left-4 absolute mt-1 bg-white rotate-45"></div>
                                        </div>
                                        <div className="bg-white p- px-10">
                                            {filteredSublinks(link.sublinks).map((sublink, sublinkIndex) => (
                                                <div key={sublinkIndex} className="flex items-center">
                                                    <h1 className="text-sm text-gray-600 my-3 flex-1">
                                                        <Link to={`${selectedSexCategory}/${link.name.toLowerCase()}/${sublink.name.toLowerCase()}`} className="hover:text-yellow-600 px-2">{sublink.name}</Link>
                                                    </h1>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default HeaderSubmenu
