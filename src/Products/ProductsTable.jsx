import React, { useMemo, useState } from "react"
import {
	Button,
	Container,
	Select,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Tfoot,
} from "@chakra-ui/react"
import { AiFillDelete } from "react-icons/ai"
const ProductsTable = ({ products, setProducts }) => {
	const [searchWord, setSearchWord] = useState("")

	const filteredProducts = useMemo(() => {
		return searchWord === ""
			? products
			: products.filter((product) => product.cat === searchWord && product)
	}, [searchWord, products])

	const deleteProducts = (id) => {
		const result = products.filter((product) => product.id !== id && product)
		setProducts(() => result)
	}
	if (products.length === 0) return null
	return (
		<Container
			maxW="xl"
			bg="blue.200"
			py="10"
			my="10"
			borderRadius={10}
			centerContent
		>
			<Select
				id="Category"
				placeholder="All Category"
				bg="white"
				onChange={(e) => {
					setSearchWord(e.target.value)
				}}
			>
				<option value="Groceries">Groceries</option>
				<option value="Utilities">Utilities</option>
				<option value="Entertainment">Entertainment</option>
			</Select>
			<TableContainer mt="10">
				<Table size="sm" variant="simple">
					<Thead>
						<Tr>
							<Th>Description</Th>
							<Th>Category by</Th>
							<Th isNumeric>Amount</Th>
							<Th>Operations</Th>
						</Tr>
					</Thead>
					<Tbody>
						{filteredProducts.map((product, index) => (
							<Tr key={product.id}>
								<Td>{product.des}</Td>
								<Td>{product.cat}</Td>
								<Td isNumeric>${product.amount}</Td>
								<Td isNumeric>
									<Button
										bg="blue.200"
										type="submit"
										leftIcon={
											<AiFillDelete
												color="red"
												size="25"
												onClick={() => deleteProducts(product.id)}
											/>
										}
									></Button>
								</Td>
							</Tr>
						))}
					</Tbody>
					{filteredProducts.length > 0 && (
						<Tfoot>
							<Tr>
								<Th
									colSpan={2}
									color="green.500"
									fontSize={18}
									fontWeight="bolder"
								>
									Total
								</Th>
								<Th
									isNumeric
									colSpan={1}
									color="green.500"
									fontSize={18}
									fontWeight="bolder"
								>
									$
									{filteredProducts
										.reduce((acc, product) => product.amount + acc, 0)
										.toFixed(2)}
								</Th>
							</Tr>
						</Tfoot>
					)}
				</Table>
			</TableContainer>
		</Container>
	)
}

export default ProductsTable
