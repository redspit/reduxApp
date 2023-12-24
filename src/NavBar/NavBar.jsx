import { Link, useLocation } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import menuItems  from "./menuItems"
const NavBar = () => {
	const location = useLocation()
	const color = "text-sky-300"
	const activeLinkColor =
		"text-purple-500 border-sky-500 border rounded-md px-3"
	const activeHoverLinkColor = "hover:text-purple-500"

	return (
		<Box bgColor="blue.900" py={6} px={50} borderRadius={10} mx={2}>
			<ul
				className={`flex gap-5 font-bold md:text-md lg:text-lg xs:text-sm ${color} `}
			>
				{menuItems.map((menuItem) => (
					<li
						className={`${activeHoverLinkColor} cursor-pointer ${
							location.pathname == menuItem.path ? activeLinkColor : ""
						}`}
						key={menuItem.name}
					>
						<Link to={menuItem.path}>{menuItem.name}</Link>
					</li>
				))}
			</ul>
		</Box>
	)
}

export default NavBar
