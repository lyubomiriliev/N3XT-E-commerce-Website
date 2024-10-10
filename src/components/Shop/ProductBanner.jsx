import { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { ImList } from "react-icons/im";

import useDeviceDetect from "../../hooks/useDeviceDetect";
import { FaSort } from "react-icons/fa";




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

	const isMobile = useDeviceDetect();

	useEffect(() => {
		const gridView = document.querySelector(".gridView");
		const listView = document.querySelector(".listView");

		if (gridView) {
			gridView.addEventListener("click", () => {
				setListViewActive(false);
				setGridViewActive(true);
				onViewChange("grid")
				localStorage.setItem('view', 'grid')
			});
		}

		if (listView) {
			listView.addEventListener("click", () => {
				setGridViewActive(false);
				setListViewActive(true);
				onViewChange("list")
				localStorage.setItem('view', 'list')
				
				
			});
		}
	}, [girdViewActive, listViewActive, onViewChange]);
	// LIST OR GRID VIEW LOGIC END


	return (
		<div className="w-full  flex flex-1 items-center justify-end">
			{/* LIST OR GRID VIEW START */}
			{
				!isMobile && (
					<div className="flex items-center gap-2">
						<span
							className={`${girdViewActive
								? "bg-gray-800 text-white"
								: "border-[1px] border-gray-300 text-[#737373]"
								} w-9 h-9 rounded-md text-lg flex items-center justify-center cursor-pointer gridView`}
						>
							<BsGridFill />
						</span>
						<span
							className={`${listViewActive
								? "bg-gray-800 text-white"
								: "border-[1px] border-gray-300 text-[#737373]"
								} w-9 h-9 rounded-md text-base flex items-center justify-center cursor-pointer listView`}
						>
							<ImList />
						</span>
					</div>
				)
			}
			{/* LIST OR GRID VIEW END */}

			{/* SORT AND PAGINATION START */}
			<div className="flex flex-1 justify-end items-center gap-4">
				<div className="flex items-center gap-2 relative">
					<label className="block">Show:</label>
					<select
						className="w-16 md:w-20 border-[1px] rounded-md border-gray-200 py-1 px-4 cursor-pointer text-gray-800 text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-gray-800"
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
