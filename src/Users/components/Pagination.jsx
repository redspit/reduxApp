import { Button, Flex } from "@chakra-ui/react"
import React from 'react';

const Pagination = ({
	totalUsers,
	usersPerPage,
	setCurrentPage,
	currentPage,
}) => {
	let pages = []
	for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
		pages.push(i)
	}
	return (
		<Flex minWidth="max-content" alignItems="center" gap="2" marginBottom={5}>
			<Button onClick={() => setCurrentPage(1)}>First</Button>
			{pages.map((page, index) => (
				<Button
					key={page}
					bg={page === currentPage ? "#FFD700" : "gray.100"}
					onClick={() => setCurrentPage(index + 1)}
				>
					{page}
				</Button>
			))}
			<Button onClick={() => setCurrentPage(pages.length)}>Last</Button>
		</Flex>
	)
}

export default Pagination;