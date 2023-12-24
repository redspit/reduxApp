import React, { useState } from "react"
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	Select,
	useToast,
} from "@chakra-ui/react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { v4 } from "uuid"
import axios, { CanceledError } from "./services/axios"
const AddUser = ({ users, setUsers, setError }) => {


	const toast = useToast()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)

	const scheme = z.object({
		name: z
			.string()
			.trim()
			.min(3, { message: "name should be at least 3 characters long." }),
		type: z.string().min(3, { message: "Role must be specified" }),
		city: z
			.string()
			.min(3, { message: "city must be at least 3 characters long." }),
		image: z.string(),
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(scheme),
	})

	const addUser = (data) => {
		const usersList = [...users]
		const newUser = {
			id: v4(),
			name: data.name,
			type: data.type,
			city: data.city,
			image: data.image,
		}
		setUsers((prev) => [...prev, newUser])
		axios
			.post("/users", newUser)
			.then((res) => {
				setUsers([...users, res.data])
				toast({
						title: "Adding User",
						description: "user has been Added successfully.",
						status: "success",
						duration: 3000,
						isClosable: true,
							})
			})
			.catch((err) => {
				setError(() => err.message)
				setUsers(() => usersList)
			})
	}

	return (
		<div className="mt-5">
			<Button onClick={onOpen} mb={2} ref={finalRef}>
				Add New User
			</Button>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
			>
				<ModalOverlay />
				<form
					onSubmit={handleSubmit((data) => {
						addUser(data)
						reset()
						onClose()
					})}
				>
					<ModalContent>
						<ModalHeader>Add User</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<FormControl>
								<FormLabel>Full name</FormLabel>
								<Input
									ref={initialRef}
									placeholder="Full name"
									id="name"
									{...register("name", { required: true })}
								/>
								{errors.name && (
									<span className="text-red-500">{errors.name.message}</span>
								)}
							</FormControl>
							<FormControl mt={4}>
								<FormLabel>City</FormLabel>
								<Input
									placeholder="City"
									id="city"
									{...register("city", { required: true })}
								/>
								{errors.city && (
									<span className="text-red-500">{errors.city.message}</span>
								)}
							</FormControl>
							<FormControl mt={4}>
								<FormLabel>Role</FormLabel>
								<Select
									placeholder="Select option"
									id="type"
									{...register("type", { required: true })}
								>
									<option value="Admin">Admin</option>
									<option value="Mod">Mod</option>
									<option value="User">User</option>
								</Select>
								{errors.type && (
									<span className="text-red-500">{errors.type.message}</span>
								)}
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>Image</FormLabel>
								<Input
									placeholder="Image"
									id="image"
									{...register("image", { required: true })}
								/>
								{errors.image && (
									<span className="text-red-500">{errors.image.message}</span>
								)}
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme="blue" mr={3} type="submit">
								Save
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</div>
	)
}

export default AddUser
