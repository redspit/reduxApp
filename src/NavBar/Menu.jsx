import { Route, Routes, useLocation } from "react-router-dom"
import menuItems from "./menuItems"
import { useState } from "react"
import { AnimatePresence} from 'framer-motion'
const Menu = () => {
	const location = useLocation()
	const [displayLocation, setDisplayLocation] = useState(location)

	return (
		<AnimatePresence>
			<Routes location={location} key={location.pathname}>
				{menuItems.map((menuItem) => (
					<Route
						path={menuItem.path}
						element={menuItem.component}
						key={menuItem.name}
					/>
				))}
			</Routes>
		</AnimatePresence>
	)
}

export default Menu
