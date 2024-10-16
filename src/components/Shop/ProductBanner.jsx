import { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { ImList } from "react-icons/im";

import useDeviceDetect from "../../hooks/useDeviceDetect";




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
				<div className="relative text-gray-800">
					<select
						className="block w-full appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus-ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out text-gray-700"
						onChange={(e) => onItemsPerPageChange(+e.target.value)}
					>
						<option value="12">12</option>
						<option value="24">24</option>
						<option value="36">36</option>
						<option value="48">48</option>
					</select>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<GoTriangleDown />
					</span>
				</div>
			</div>

			{/* SORT AND PAGINATION END */}
		</div>
	)
}

export default ProductBanner
