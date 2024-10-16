import { Link, useLocation } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useSelector } from "react-redux";

const Breadcrumbs = ({ resetSubmenu }) => {

  const location = useLocation()
  const pathname = location.pathname;

  const selectedSexCategory = useSelector((state) => state.next.sexCategory)
  const selectedSubheaderMenu = useSelector((state) => state.next.headerSubmenu)


  const productCategory =
    selectedSubheaderMenu === 'clothing' ? "Clothing" :
      selectedSubheaderMenu === 'shoes' ? "Shoes" :
        selectedSubheaderMenu === 'accessories' ? "Accessories" :
          selectedSubheaderMenu === 'bags' ? "Bags" :
            selectedSubheaderMenu === 'jewellery' ? "Jewellery" : []

            const lastSegment = pathname.substring(pathname.lastIndexOf("/") +1)
            const isMainSection = selectedSubheaderMenu === lastSegment     

  return (
    <div className="w-full md:w-2/3 flex gap-1 items-center">
      <Link to={`/${selectedSexCategory}`}>
        <h1 className="uppercase text-sm md:text-base text-gray-400">Home page</h1>
      </Link>
      <div className="flex items-center" >
        <ArrowForwardIosOutlinedIcon className=" scale-75 text-gray-400" />
      </div>
      <Link to={`/${selectedSexCategory}/${selectedSubheaderMenu.toLowerCase()}`} onClick={resetSubmenu}>
      <h1 className="uppercase text-sm md:text-base text-gray-400">{selectedSubheaderMenu}</h1>
      </Link>
      {!isMainSection && (
        <>
         <div className="flex items-center" >
        <ArrowForwardIosOutlinedIcon className=" scale-75 text-gray-400" />
        </div>
        <div>
          <h1 className="uppercase text-sm md:text-base text-gray-400">{lastSegment}</h1>
        </div>
        </>
      )}
     
    </div>
  );
};

export default Breadcrumbs;
