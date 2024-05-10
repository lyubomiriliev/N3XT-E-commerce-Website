import { toggleCategory } from "../../../redux/nextSlice";
import { useDispatch, useSelector } from "react-redux";

const Category = () => {

  const checkedCategorys = useSelector(
    (state) => state.next.checkedCategorys);

  const dispatch = useDispatch();

  const category = [
    {
      _id: 9006,
      title: "Clothing",
    },
    {
      _id: 9007,
      title: "Shoes",
    },
    {
      _id: 9008,
      title: "Accessories",
    },
    {
      _id: 9009,
      title: "Bags",
    },
    {
      _id: 9010,
      title: "Jewellery",
    },
  ];

  const handleToggleCategory = (category) => {
    dispatch(toggleCategory(category));
  };

  return (
    <div className="w-full">
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base">
          {category.map((item) => (
            <li
              className="border-b-[1px] border-b[#F0F0F0] pb-2 flex items-center gap-2"
              key={item._id}
            >
              <input
                type="chekcbox"
                id={item._id}
                checked={checkedCategorys.some((b) => b._id === item._id)}
                onChange={() => handleToggleCategory(item)}
              />
              {item.title}
            </li>
          ))}
          <li onClick={() => console.log(checkedCategorys)}>test</li>
        </ul>
      </div>
    </div>
  );
};

export default Category;
