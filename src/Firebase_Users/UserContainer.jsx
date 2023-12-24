import React from "react"
import {
	Box,
    Text,
    Avatar,
	Container,
	Button,
	Editable,
	EditablePreview,
	EditableInput,
} from "@chakra-ui/react"
const UserContainer = ({ user }) => {

	const roleStyle = user.role === "Admin" ? "#FFD700" : "gray.300"
	
    return (
		<Container bg={ roleStyle } borderRadius={15} p={12}>
				<ul>
					<li className="flex justify-center">
						<Avatar name={user.name} size="xl" src={user.image} />
					</li>
					<li className="flex gap-2">
						<Container centerContent my={5}>
							<Editable defaultValue={user.name}>
								<EditablePreview fontSize={25} fontWeight="bold" />
								<EditableInput />
							</Editable>
						</Container>
					</li>
					<li className="flex items-center gap-2">
						<Text fontSize={18} fontWeight="bold">
							Role:{" "}
						</Text>
						<Editable defaultValue={user.role}>
							<EditablePreview fontSize={16} />
							<EditableInput />
						</Editable>
					</li>

					<li className="flex justify-center gap-1 mt-3">
						<Button bg="red.500" borderRadius={5}>
							Delete User
						</Button>
					</li>
				</ul>
			</Container>
		)
}

export default UserContainer
