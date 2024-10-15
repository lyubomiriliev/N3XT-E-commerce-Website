import { Link, useLocation } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useSelector } from "react-redux";

const Breadcrumbs = ({ category, resetSubmenu }) => {

  const location = useLocation()
  const pathname = location.pathname;

  const selectedSexCategory = useSelector((state) => state.next.sexCategory)



  const productCategory =
    category === 'clothing' ? "Clothing" :
      category === 'shoes' ? "Shoes" :
        category === 'accessories' ? "Accessories" :
          category === 'bags' ? "Bags" :
            category === 'jewellery' ? "Jewellery" : []

            const lastSegment = pathname.substring(pathname.lastIndexOf("/") +1)
            const isMainSection = category === lastSegment     

  return (
    <div className="w-full flex justify-center items-center gap-5">
      <Link to={`/${selectedSexCategory}`}>
        <h1 className="uppercase text-sm md:text-base text-gray-600">Home page</h1>
      </Link>
      <div className="flex items-center" >
        <ArrowForwardIosOutlinedIcon className=" scale-75 text-gray-600" />
      </div>
      <Link to={`/${selectedSexCategory}/${productCategory.toLowerCase()}`} onClick={resetSubmenu}>
      <h1 className="uppercase text-sm md:text-base text-gray-600">{productCategory}</h1>
      </Link>
      {!isMainSection && (
        <>
         <div className="flex items-center" >
        <ArrowForwardIosOutlinedIcon className=" scale-75 text-gray-600" />
        </div>
        <div>
          <h1 className="uppercase text-sm md:text-base text-gray-600">{lastSegment}</h1>
        </div>
        </>
      )}
     
    </div>
  );
};

export default Breadcrumbs;
