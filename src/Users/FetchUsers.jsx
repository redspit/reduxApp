import { Container, Spinner, Alert, AlertIcon } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import User from "./User"

import AddUserModel from "./AddUserModel"
import apiClient, { CanceledError } from "./services/api-client"
import UserService from "./services/userService"
import { motion } from 'framer-motion'
const FetchUsers = () => {
	const [users, setUsers] = useState([])
	const [error, setError] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(() => true)

		const { request, cancel } = UserService.getAllUsers()
		request
			.then((res) => setUsers(() => res.data))
			.catch((err) => {
				if (err instanceof CanceledError) return
				setError(() => err.message)
			})
			.finally(() => setIsLoading(() => false))
		return () => cancel()
	}, [])

	const deleteUser = (id) => {
		const originalList = [...users]
		setUsers(() => users.filter((user) => user.id !== id))
		apiClient.delete("users/" + id).catch((err) => {
			setError(() => err.message)
			setUsers(() => originalList)
		})
	}

	const updateUser = (updatedUser, updatedField, txt) => {
		const originalList = [...users]
		setUsers(() => {
			if (updatedField === "name") {
				return users.map((user) =>
					user.id === updatedUser.id ? { ...user, name: txt } : user
				)
			} else if (updatedField === "email") {
				return users.map((user) =>
					user.id === updatedUser.id ? { ...user, email: txt } : user
				)
			} else if (updatedField === "phone") {
				return users.map((user) =>
					updatedUser.id === updatedUser.id ? { ...user, phone: txt } : user
				)
			}
		})
		if (updatedField === "name")
			apiClient
				.patch("/users/" + updatedUser.id, {
					...updatedUser,
					name: txt,
				})
				.catch((err) => {
					setError(() => err.message)
					setUsers(() => originalList)
				})
		else if (updatedField === "email")
			apiClient
				.patch("/users/" + updatedUser.id, {
					...updatedUser,
					email: txt,
				})
				.catch((err) => {
					setError(() => err.message)
					setUsers(() => originalList)
				})
		else if (updatedField === "phone")
			apiClient
				.patch("/users/" + updatedUser.id, {
					...updatedUser,
					phone: txt,
				})
				.catch((err) => {
					setError(() => err.message)
					setUsers(() => originalList)
				})
	}
	return (
		<motion.div
			initial={{ width: 0 }}
			animate={{ width: "100vw" }}

			transition={{ duration: 1 }}
		>
			<Container centerContent>
				{isLoading && (
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="blue.500"
						size="xl"
					/>
				)}
				<AddUserModel setUsers={setUsers} users={users} />
				<User
					users={users}
					onDelete={(id) => deleteUser(id)}
					updateUser={updateUser}
				/>
				{error != "" && (
					<Alert status="error" borderRadius={12}>
						<AlertIcon />
						{error}
					</Alert>
				)}
			</Container>
		</motion.div>
	)
}

export default FetchUsers
