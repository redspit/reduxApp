import {
	Button,
	Container,
	Input,
	Editable,
	EditableInput,
	EditablePreview,
	Checkbox,
	Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { MdBuild } from "react-icons/md"
import { AiFillDelete } from "react-icons/ai"
import { v4 } from "uuid"

const ObjectsStates = () => {
	const [bugs, setBugs] = useState([])
	const [text, setText] = useState("")

	useEffect(() => {
			localStorage.getItem("Bugs") && setBugs(() => JSON.parse(localStorage.getItem("Bugs")))
	}, [])
	
	useEffect(() => {
		localStorage.setItem("Bugs", JSON.stringify(bugs))
	},[bugs])


	let textEdit = ""

	const addBugs = () => {
		if (text) {
			const newBugsList = [...bugs, { id: v4(), title: text, fixed: false }]
			setBugs(() => newBugsList)
			setText(() => "")
		}
	}

	const deleteBug = (id) => {
		const newBugsList = bugs.filter((bug) => bug.id != id)
		setBugs(() => newBugsList)
	}
	
	const updateBugStatus = (id, event) => {
		const newBugsList = bugs.map((bug) =>
			bug.id === id ? { ...bug, fixed: event.target.checked } : bug
		)
		setBugs(() => newBugsList)
	}
	const updateBugTitle = (id, textEdit) => {
		const newBugsList = bugs.map((bug) =>
			bug.id === id ? { ...bug, title: textEdit } : bug
		)
			setBugs(() => newBugsList)
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
				{bugs == null || bugs.length == 0 ? (
					<Text>No Bugs Recorded</Text>
				) : (
					bugs.map((bug) => (
						<div key={bug.id}>
							<li className={`flex justify-between gap-5 `}>
								<Editable defaultValue={bug.title}>
									<EditablePreview
										className={`text-lg ${
											bug.fixed === true ? "line-through" : ""
										}`}
										fontWeight="bold"
									/>
									<EditableInput
										onChange={(e) => {
											textEdit = e.target.value
										}}
										onKeyDown={(e) => {
											e.key === "Enter" && updateBugTitle(bug.id, textEdit)
										}}
									/>
								</Editable>
								<div className="flex justify-center items-center gap-3">
									<Checkbox
										colorScheme="teal"
										defaultChecked={bug.fixed}
										onChange={(e) => updateBugStatus(bug.id, e)}
									></Checkbox>
									<button>
										<AiFillDelete
											color="#dc3545"
											size={26}
											onClick={() => deleteBug(bug.id)}
										/>
									</button>
								</div>
							</li>
						</div>
					))
				)}
			</ul>
			<Input
				placeholder="Add Bug"
				size="md"
				bg="grey-200"
				variant="outline"
				value={text}
				onChange={(e) => setText(() => e.target.value)}
				onKeyDown={(e) => {
					e.key === "Enter" && addBugs()
				}}
				sx={{ marginTop: "20px" }}
			/>

			<Button
				rightIcon={<MdBuild />}
				colorScheme="teal"
				w="100px"
				mt="6"
				onClick={addBugs}
			>
				Add Bug
			</Button>
		</Container>
	)
}

export default ObjectsStates
