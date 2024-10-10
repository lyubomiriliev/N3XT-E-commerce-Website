import { FavoriteBorderOutlined, ShoppingBagOutlined } from "@mui/icons-material"
import { AiOutlineClose } from "react-icons/ai"
import { FaSearch } from "react-icons/fa"
import { GiHamburgerMenu } from "react-icons/gi"
import { HiOutlineUserCircle } from "react-icons/hi2"


export const menuItems = [
    {label: "Women", path: "/women", id: "women"},
    {label: "Men", path: "/men", id: "men"}
]

export const headerIcons = {
    search: FaSearch,
    burgerOpen: GiHamburgerMenu,
    burgerClose: AiOutlineClose,
    user: HiOutlineUserCircle,
    cart: ShoppingBagOutlined,
    wishlist: FavoriteBorderOutlined,
}
