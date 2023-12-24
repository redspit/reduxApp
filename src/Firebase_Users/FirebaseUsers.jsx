import {
	Grid,
	Spinner,
	Alert,
	AlertIcon,
	useToast,
	Button,
	Flex,
	Center,
} from "@chakra-ui/react"
import React, { useEffect, useMemo, useState } from "react"
import UserContainer from "./UserContainer"

import { getFirestore, collection, onSnapshot, doc } from "firebase/firestore"
import { app } from "./services/config"
import Header from "./components/Header"
import Pagination from "./components/Pagination"
import { v4 } from "uuid"

const FirebaseUsers = () => {
	const [users, setUsers] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [filter, setFilter] = useState(null)
	const [search, setSearch] = useState("")
	const [currentPage, setCurrentPage] = useState(1)

	const firestore = getFirestore(app)
	const usersCollection = collection(firestore, "Users")

	useEffect(() => {
		setIsLoading(() => true)
		setError(null)
		const controller = new AbortController()
		onSnapshot(usersCollection, (snapshot) => {
			setUsers(() => snapshot.docs.map((doc) => doc.data()))
			setIsLoading(() => false)
		}, error => {
			setIsLoading(() => false)
			setError(()=> error.message)
		})
		return () => controller.abort()
	}, [])

	let filteredUsers = useMemo(() => {
		setCurrentPage(1)
		const temp = users.filter((user) =>
			filter == "All" || filter == null ? user : user.role === filter
		)
		if (search === "") return temp
		else
			return temp.filter((user) =>
				user.name.toLowerCase().includes(search.toLowerCase())
			)
	}, [users, filter, search])

	const usersPerPage = 6
	const lastUserIndex = currentPage * usersPerPage
	const firstUserIndex = lastUserIndex - usersPerPage
	const filteredUsersSlice = filteredUsers.slice(firstUserIndex, lastUserIndex)
	return (
		<div className="flex flex-col items-center justify-between ">
			{isLoading && (
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
					marginY={5}
				/>
			)}
			{isLoading || (
				<Header
					users={users}
					setUsers={setUsers}
					setError={setError}
					setFilter={setFilter}
					setSearch={setSearch}
				/>
			)}
			<div className="flex flex-col justify-evenly h-full">
				<Grid
					templateColumns={{
						base: "1",
						md: "repeat(2, 1fr)",
						lg: "repeat(3, 1fr)",
					}}
					gap={4}
					margin={5}
				>
					{filteredUsersSlice.map((user) => (
						<UserContainer user={user} key={user.id} />
					))}
				</Grid>
				<Center>
					<Pagination
						usersPerPage={usersPerPage}
						totalUsers={filteredUsers.length}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</Center>
			</div>
			{error && (
				<Alert status="error" borderRadius={12} w="50%" marginY={5}>
					<AlertIcon />
					{error}
				</Alert>
			)}
		</div>
	)
}

export default FirebaseUsers
