import {
	Button,
	Container,
	Input,
	Text,
	FormControl,
	FormLabel,
	Select,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ProductsTable from "./ProductsTable"
import { v4 } from "uuid"
import {motion} from 'framer-motion'
const ProductsForm = () => {
	const [isLoading, setIsLoaded] = useState(false)

	const [products, setProducts] = useState([])

	const scheme = z.object({
		description: z
			.string()
			.trim()
			.min(3, { message: "Description should be at least 3 characters." }),
		amount: z.number().gt(0, { message: "Amount must be more then 0." }),
		category: z.string().min(1, { message: "Category is required." }),
	})
	useEffect(() => {
		if (localStorage.getItem("products") !== null)
			setProducts(() => JSON.parse(localStorage.getItem("products")))
	}, [])
	
	useEffect(() => {
		localStorage.setItem("products", JSON.stringify(products))
	}, [products])
	
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		resolver: zodResolver(scheme),
	})
	const submitProducts = (data) => {
		setIsLoaded(() => true)
		setProducts((prev) => {
			const newProduct = [
				...prev,
				{
					id: v4(),
					des: data.description,
					amount: parseInt(data.amount),
					cat: data.category,
				},
			]
			return newProduct
		})

		setTimeout(() => setIsLoaded(() => false), "500")
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			<Container
				maxW="lg"
				bg="blue.200"
				p={ 10}
				borderRadius={10}
				marginTop={5}
			>
				<form
					onSubmit={handleSubmit((data) => {
						submitProducts(data)
						reset()
					})}
				>
					<FormControl>
						<FormLabel htmlFor="description">Description</FormLabel>
						<Input
							id="description"
							type="text"
							bg="white"
							{...register("description", { required: true })}
						/>
						{errors.description && (
							<Text color="red.700"> {errors.description.message}</Text>
						)}
						<FormLabel htmlFor="amount">Amount</FormLabel>
						<NumberInput
							max={100000.0}
							min={0.0}
							bg="white"
							defaultValue={0.0}
							allowMouseWheel
						>
							<NumberInputField
								id="amount"
								{...register("amount", { valueAsNumber: true, required: true })}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						{errors.amount && (
							<Text color="red.700"> {errors.amount.message}</Text>
						)}
						<FormLabel htmlFor="Category">Category</FormLabel>
						<Select
							id="Category"
							placeholder="Select Category"
							bg="white"
							{...register("category", { required: true })}
						>
							<option value="Groceries">Groceries</option>
							<option value="Utilities">Utilities</option>
							<option value="Entertainment">Entertainment</option>
						</Select>
						{errors.category && (
							<Text color="red.700"> {errors.category.message}</Text>
						)}
						<Button
							mt={4}
							colorScheme="teal"
							isLoading={isLoading}
							type="submit"
							loadingText="Submitting"
							spinnerPlacement="end"
							isDisabled={!isValid}
						>
							Submit
						</Button>
					</FormControl>
				</form>
			</Container>
			<ProductsTable products={products} setProducts={setProducts} />
		</motion.div>
	)
}

export default ProductsForm
