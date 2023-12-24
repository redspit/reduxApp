import React from 'react';
import { IoSearchSharp } from "react-icons/io5"
import AddUser from "../AddUser"
import {
	Select,
	Input,
	InputGroup,
	InputLeftElement,
	Center,
} from "@chakra-ui/react"
const Header = ({ setUsers, users, setError, setSearch, setFilter }) => {
	return (
		<>
			<AddUser setUsers={setUsers} users={users} setError={setError} />
			<Center>
				<InputGroup>
					<InputLeftElement pointerEvents="none" paddingTop={5}>
						<IoSearchSharp color="gray.300" size="25px" />
					</InputLeftElement>
					<Input
						placeholder="Search"
						w="50vw"
						marginY={2}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</InputGroup>
			</Center>
			<Select onChange={(e) => setFilter(() => e.target.value)} w="50%">
				<option value="All">All</option>
				<option value="Admin">Admin</option>
				<option value="Mod">Mod</option>
				<option value="User">User</option>
			</Select>
		</>
	)
}

export default React.memo(Header)