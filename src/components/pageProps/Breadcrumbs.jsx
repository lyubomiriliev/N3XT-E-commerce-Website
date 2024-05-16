import { Link } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const Breadcrumbs = ({ category }) => {

  const productCategory =
    category === 'clothing' ? "Clothing" :
      category === 'shoes' ? "Shoes" :
        category === 'accessories' ? "Accessories" :
          category === 'bags' ? "Bags" :
            category === 'jewellery' ? "Jewellery" : []

  return (
    <div className="flex gap-5">
      <Link to="/">
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
