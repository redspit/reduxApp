import React from "react"
import {
	Box,
	Text,
	Container,
	Button,
	Editable,
	EditablePreview,
	EditableInput,
} from "@chakra-ui/react"
const User = ({ users, onDelete, updateUser }) => {
	return (
		<Box bgColor="sky.500">
			{users.map((user) => (
				<Container bg="gray.300" borderRadius={15} mb={5} p={12} key={user.id}>
					<ul>
						<li className="flex justify-center">
							<Text fontSize={30} fontWeight="bold" color="green.500">
								{user.id}
							</Text>
						</li>
						<li className="flex gap-2">
							<Container centerContent my={5}>
								<Editable defaultValue={user.name}>
									<EditablePreview fontSize={25} fontWeight="bold" />
									<EditableInput
										onKeyDown={(e) => {
											e.key === "Enter" &&
												updateUser(user, "name", e.target.value)
										}}
									/>
								</Editable>
							</Container>
						</li>
						<li className="flex items-center gap-2">
							<Text fontSize={18} fontWeight="bold">
								Email:{" "}
							</Text>
							<Editable defaultValue={user.email}>
								<EditablePreview fontSize={16} />
								<EditableInput
									onKeyDown={(e) => {
										e.key === "Enter" &&
											updateUser(user, "email", e.target.value)
									}}
								/>
							</Editable>
						</li>
						<li className="flex items-center gap-2">
							<Text fontSize={18} fontWeight="bold">
								Phone:
							</Text>
							<Editable defaultValue={user.phone}>
								<EditablePreview fontSize={16} />
								<EditableInput
									onKeyDown={(e) => {
										e.key === "Enter" &&
											updateUser(user, "phone", e.target.value)
									}}
								/>
							</Editable>
						</li>

						<li className="flex justify-center gap-1 mt-3">
							<Button
								onClick={() => onDelete(user.id)}
								bg="red.500"
								borderRadius={5}
							>
								Delete User
							</Button>
						</li>
					</ul>
				</Container>
			))}
		</Box>
	)
}

export default User
