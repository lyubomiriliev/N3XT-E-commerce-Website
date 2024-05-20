import { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { ImList } from "react-icons/im";



const ProductBanner = ({ onItemsPerPageChange, onViewChange, onSortChange }) => {

	// LIST OR GRID VIEW LOGIC START
	const [girdViewActive, setGridViewActive] = useState(true);
	const [listViewActive, setListViewActive] = useState(false);

	useEffect(() => {
		const savedView = localStorage.getItem('view');
		if (savedView) {
			if (savedView === 'grid') {
				setGridViewActive(true);
				setListViewActive(false);
				onViewChange('grid');
			} else {
				setGridViewActive(false);
				setListViewActive(true);
				onViewChange('list');
			}
		}
	}, [onViewChange])

	useEffect(() => {
		const gridView = document.querySelector(".gridView");
		const listView = document.querySelector(".listView");

		gridView.addEventListener("click", () => {
			setListViewActive(false);
			setGridViewActive(true);
			onViewChange("grid")
			localStorage.setItem('view', 'grid')
		});
		listView.addEventListener("click", () => {
			setGridViewActive(false);
			setListViewActive(true);
			onViewChange("list")
			localStorage.setItem('view', 'list')


		});
	}, [girdViewActive, listViewActive, onViewChange]);
	// LIST OR GRID VIEW LOGIC END


	return (
		<div className="w-full ml-9 -mr-9 flex flex-col md:flex-row md:items-center justify-between">

			{/* LIST OR GRID VIEW START */}
			<div className="flex items-center gap-4">
				<span
					className={`${girdViewActive
						? "bg-gray-800 text-white"
						: "border-[1px] border-gray-300 text-[#737373]"
						} w-8 h-8 text-lg flex items-center justify-center cursor-pointer gridView`}
				>
					<BsGridFill />
				</span>
				<span
					className={`${listViewActive
						? "bg-gray-800 text-white"
						: "border-[1px] border-gray-300 text-[#737373]"
						} w-8 h-8 text-base flex items-center justify-center cursor-pointer listView`}
				>
					<ImList />
				</span>
			</div>
			{/* LIST OR GRID VIEW END */}

			{/* SORT AND PAGINATION START */}

			<div className="flex items-center gap-2 md:gap-10 mt-4 md:mt-0">
				<div className="flex items-center gap-2 text-base relative">
					<label className="block">Sort by:</label>
					<select
						onChange={(e) => onSortChange(e.target.value)}
						className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-gray-800 text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-gray-800">
						<option value="high-to-low">Low to High:</option>
						<option value="low-to-high">High to Low:</option>
					</select>
					<span className="absolute text-sm right-2 md:right-4 top-2.5">
						<GoTriangleDown />
					</span>
				</div>
				<div className="flex items-center gap-2 relative">
					<label className="block">Show:</label>
					<select
						className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-gray-800 text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-gray-800"
						onChange={(e) => onItemsPerPageChange(+e.target.value)}
					>
						<option value="12">12</option>
						<option value="24">24</option>
						<option value="36">36</option>
						<option value="48">48</option>
					</select>
					<span className="absolute text-sm right-3 top-2.5">
						<GoTriangleDown />
					</span>
				</div>
			</div>

			{/* SORT AND PAGINATION END */}
		</div>
	)
}

export default ProductBanner
