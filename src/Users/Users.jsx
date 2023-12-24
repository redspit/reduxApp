import { Grid, Spinner, Alert, AlertIcon, useToast } from "@chakra-ui/react"
import React, { useEffect, useMemo, useCallback, useState } from "react"
import UserContainer from "./UserContainer"
import { motion } from "framer-motion"
import axios, { CanceledError } from "./services/axios.js"
import Header from "./components/Header"
import Pagination from "./components/Pagination"
const Users = () => {
	const [users, setUsers] = useState([])
	const [error, setError] = useState(null)
	const [filter, setFilter] = useState(null)
	const [search, setSearch] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)

	const toast = useToast()
	useEffect(() => {
		setIsLoading(() => true)
		setError(null)
		const controller = new AbortController()
		axios
			.get("/users", { signal: controller.signal })
			.then((res) => setUsers(() => res.data))
			.catch((err) => {
				if (err instanceof CanceledError) return
				setError(() => err.message)
			})
			.finally(() => setIsLoading(() => false))

		return () => controller.abort()
	}, [])

	let filteredUsers = useMemo(() => {
		setCurrentPage(1)
		const temp = users.filter((user) =>
			filter == "All" || filter == null ? user : user.type === filter
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

	// const filteredUsers = useCallback(() => {
	//  const temp = users.filter((user) =>
	//    filter == "All" || filter == null ? user : user.type === filter
	//  )
	//  if (search === "") return temp
	//  else
	//    return temp.filter((user) =>
	//      user.name.toLowerCase().includes(search.toLowerCase())
	//    )
	// }, [users, filter, search])

	const deleteUser = (id) => {
		if (confirm("Are you really sure you want to delete this user")) {
			const usersList = [...users]
			const newUsersList = users.filter((user) => user.id !== id)
			setUsers(() => newUsersList)
			axios.delete(`/users/${id}`).catch((err) => {
				setUsers(() => usersList)
				setError(() => err.message)
			})
			toast({
				title: "Deletion",
				description: "user has been deleted successfully.",
				status: "success",
				duration: 3000,
				isClosable: true,
			})
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className="flex flex-col items-center justify-center"
		>
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
					<UserContainer
						user={user}
						key={user.id}
						deleteUser={() => deleteUser(user.id)}
					/>
				))}
			</Grid>

			<Pagination
				usersPerPage={usersPerPage}
				totalUsers={filteredUsers.length}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
			{error && (
				<Alert status="error" borderRadius={12} w="50%" marginY={5}>
					<AlertIcon />
					{error}
				</Alert>
			)}
		</motion.div>
	)
}

export default Users
