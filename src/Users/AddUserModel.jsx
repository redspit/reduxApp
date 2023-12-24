import React from "react"
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
} from "@chakra-ui/react"
import apiClient from "./services/api-client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { v4 } from "uuid"
const AddUserModel = ({ users, setUsers }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)

	const scheme = z.object({
		name: z
			.string()
			.trim()
			.min(3, { message: "name should be at least 3 characters." }),
		email: z.string().min(5, { message: "Email is invalid" }),
		phone: z.string().min(6, { message: "hpone is required." }),
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
		const originalList = [...users]
		const newUser = {
			id: v4(),
			name: data.name,
			email: data.email,
			phone: data.phone,
		}
		setUsers((prev) => {
			return [...prev, newUser]
		})
		apiClient
			.post("/users", newUser)
			.then((res) => setUsers([...users, res.data]))
			.catch((err) => {
				setError(() => err.message)
				setUsers(() => originalList)
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
								<FormLabel>Email</FormLabel>
								<Input
									placeholder="Email"
									id="email"
									{...register("email", { required: true })}
								/>
								{errors.email && (
									<span className="text-red-500">{errors.email.message}</span>
								)}
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>Phone</FormLabel>
								<Input
									placeholder="Phone"
									id="phone"
									{...register("phone", { required: true })}
								/>
								{errors.phone && (
									<span className="text-red-500">{errors.phone.message}</span>
								)}
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme="blue" mr={3} type="submit" onClick={onClose}>
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

export default AddUserModel
