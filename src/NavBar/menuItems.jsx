import ProductsForm from "../Products/ProductsForm"
import PassowrdGenerator from "../PasswordGenerator/PasswordGenerator"
import FetchUsers from "../Users/FetchUsers"
import Exchanger from "../MoneyExchanger/Exchanger"
import Main from "../UseStates/Main"
import Home from "../Home/Home"
import Users from "../Users/Users"
import FirebaseUsers from "../Firebase_Users/FirebaseUsers"
// import PostsList from "../Posts/PostsList.jsx"
const menuItems = [
	{
		name: "Home",
		path: "/",
		component: <Home />,
	},
	{
		name: "Use State",
		path: "/use-states",
		component: <Main />,
	},
	{
		name: "Products",
		path: "/products",
		component: <ProductsForm />,
	},
	{
		name: "Fetch Users",
		path: "/fetch-users",
		component: <FetchUsers />,
	},
	{
		name: "Users",
		path: "/users",
		component: <Users />,
	},
	{
		name: "Firebase Users",
		path: "/firebase-users",
		component: <FirebaseUsers />,
	},
	{
		name: "Passowrd Generator",
		path: "/password-generator",
		component: <PassowrdGenerator />,
	},
	{
		name: "Money Exchanger",
		path: "/money-exchanger",
		component: <Exchanger />,
	},
	// {
	// 	name: "Posts",
	// 	path: "/posts",
	// 	component: <PostsList />,
	// },
]
export default menuItems
