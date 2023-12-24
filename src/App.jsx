import {
	BrowserRouter,
	Route,
	Routes,
	Navigate,
} from "react-router-dom"
import Menu from "./NavBar/Menu"
import NavBar from "./NavBar/NavBar"

function App() {

	return (
		<BrowserRouter>
			<div className="h-full">
				<NavBar />
				<Menu/>
			</div>
		</BrowserRouter>
	)
}

export default App
