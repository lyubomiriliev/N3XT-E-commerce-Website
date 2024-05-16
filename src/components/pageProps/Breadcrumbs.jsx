import { Link } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useSelector } from "react-redux";

const Breadcrumbs = ({ category }) => {

  const selectedSexCategory = useSelector((state) => state.next.sexCategory)

  const productCategory =
    category === 'clothing' ? "Clothing" :
      category === 'shoes' ? "Shoes" :
        category === 'accessories' ? "Accessories" :
          category === 'bags' ? "Bags" :
            category === 'jewellery' ? "Jewellery" : []

  return (
    <div className="flex gap-5">
      <Link to={`/${selectedSexCategory}`}>
        <h1 className="uppercase text-sm text-gray-600">Home page</h1>
      </Link>
      <div className="flex items-center" >
        <ArrowForwardIosOutlinedIcon className=" scale-75 text-gray-600" />
      </div>
      <h1 className="uppercase text-sm text-gray-600">{productCategory}</h1>
    </div>
  );
};

export default Breadcrumbs;
