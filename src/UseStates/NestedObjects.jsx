import {
	Container,
	Editable,
	EditableInput,
	EditablePreview,
	Text,
} from "@chakra-ui/react"
import { useState } from "react"

import { AiFillDelete } from "react-icons/ai"
const NestedObjects = () => {
	const [users, setUser] = useState([
		{
			name: "Luqman",
			address: { country: "KSA", city: "Awamiah" },
		},
	])

	const [textEdit, setTextEdit] = useState("")

	const updateUser = (index) => {
		setUser(() => {
			return users.map((el, ind) =>
				ind === index
					? { ...el, address: { ...el.country, city: textEdit } }
					: el
			)
		})
	}
	const deleteUser = (index) => {
		setUser(() => {
			return users.filter((user, ind) => ind !== index && user)
		})
	}

	return (
		<Container
			maxW="lg"
			bg="gray.300"
			color="teal-600"
			borderRadius={20}
			py="5"
			centerContent
		>
			<ul>
				{users.map((element, index) => (
					<div key={index}>
						<li className="flex justify-between gap-5">
							<Text fontSize="lg" fontWeight="bold">
								Name:
							</Text>
							<Text fontSize="lg">{element.name}</Text>
							<Text fontSize="lg" fontWeight="bold">
								Address:
							</Text>
							<Text fontSize="lg">{element.address.country}</Text>
							<Editable defaultValue={element.address.city}>
								<EditablePreview />
								<EditableInput
									onChange={(e) => {
										setTextEdit(() => e.target.value)
									}}
									onKeyDown={(e) => {
										e.key === "Enter" && updateUser(index)
									}}
								/>
							</Editable>
							<AiFillDelete
								color="#dc3545"
								size={26}
								onClick={() => deleteUser(index)}
							/>
						</li>
					</div>
				))}
			</ul>
		</Container>
	)
}

export default NestedObjects
