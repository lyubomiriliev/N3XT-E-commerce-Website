import { Link } from "react-router-dom";
import { links } from "../components/HeaderLinks"

const HeaderSubmenu = () => {

    return (
        <>
            {links.map((link, index) => (
                <div key={index}>
                    <div className="px-3 text-left md:cursor-pointer group">
                        <h1 className="py-4 hover:scale-110 font-bold  decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                            <Link to={link.dir}>{link.name}</Link>
                        </h1>
                        {link.submenu &&
                            <div>
                                <div className="absolute top-12 hidden group-hover:block hover:block">
                                    <div className="py-3">
                                        <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45">
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 px-10">
                                        {
                                            link.sublinks.map((sublink, subIndex) => (
                                                <h1 key={subIndex} className="text-sm text-gray-600 my-3">
                                                    <Link to={sublink.link} className="hover:text-yellow-600 px-2">{sublink.name}</Link>
                                                </h1>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            ))}
        </>
    )
}

export default HeaderSubmenu
