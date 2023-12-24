import {
	Button,
	Container,
	Input,
	Editable,
	EditableInput,
	EditablePreview,
} from "@chakra-ui/react"
import { useState } from "react"
import { MdAddToPhotos } from "react-icons/md"
import { AiFillDelete } from "react-icons/ai"
const Lists = () => {
	const [fruits, setFruits] = useState(["Oranges", "Apples", "Bananas"])
	const [text, setText] = useState("")
	let textEdit = ""

	const addFruits = () => {
		text && setFruits(() => [...fruits, text])
		setText(() => "")
	}
	const deleteFruit = (index) => {
		const newFruitList = fruits.filter((_,ind) => ind !== index)
		setFruits(() => newFruitList)
		console.log(newFruitList)
	}
	const updateFruit = (index, textEdit) => {
		setFruits((current) =>
			current.map((el, ind) => (ind === index ? textEdit : el))
		)
	}
	
	console.log(fruits)
	return (
		<Container
			maxW="lg"
			bg="gray.300"
			color="teal-600"
			py="5"
			borderRadius={20}
			centerContent
		>
			<ul>
				{fruits.map((fruit, index) => (
					<li className="flex justify-between gap-5" key={fruit}>
						<div className="flex justify-center items-center gap-1">
							<Editable defaultValue={fruit}>
								<EditablePreview />
								<EditableInput
									onChange={(e) => {
										textEdit = e.target.value
									}}
									onKeyDown={(e) => {
										e.key === "Enter" && updateFruit(index, textEdit)
									}}
								/>
							</Editable>
						</div>
						<AiFillDelete
							color="#dc3545"
							size={26}
							onClick={() => deleteFruit(index)}
						/>
					</li>
				))}
			</ul>
			<Input
				placeholder="Add Fruit"
				size="md"
				bg="grey-200"
				variant="outline"
				value={text}
				onChange={(e) => setText(() => e.target.value)}
				onKeyDown={(e) => {
					e.key === "Enter" && addFruits()
				}}
				sx={{ marginTop: "20px" }}
			/>

			<Button
				leftIcon={<MdAddToPhotos />}
				colorScheme="teal"
				w="100px"
				mt="6"
				onClick={addFruits}
			>
				Add Fruit
			</Button>
		</Container>
	)
}

export default Lists
