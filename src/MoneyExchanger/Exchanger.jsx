import React, { useEffect, useState } from "react"
import { MdOutlineSwapVerticalCircle } from "react-icons/md"
import {
	Text,
	Button,
	Container,
	Select,
	Input,
	Alert,
	AlertIcon,
} from "@chakra-ui/react"
import axios from "axios"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from 'framer-motion'
const Exchanger = () => {
	const [input, setInput] = useState({ currency: 10, code: "" })
	const [output, setOutput] = useState({ currency: 3.75, code: "" })
	const [allCurrency, setAllCurrency] = useState([])

	const scheme = z.object({
		input: z
			.number({ message: "Amount must a number" })
			.gt(0, { message: "Amount must be more then 0." }),
		selectInput: z.string().max(5, { message: "Input Currency is required." }),
		selectOutput: z.string().max(5, { message: "Output Currency is required." }),
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(scheme),
	})

	useEffect(() => {
		axios
			.get(
				"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
			)
			.then((res) => {
				let currencies = Object.keys(res.data)
				currencies.splice(0, 1)
				setAllCurrency(currencies)
			})
	}, [])

	const convert = (data) => {
		axios
			.get(
				`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${data.selectInput}.json`
			)
			.then((res) => {
				let curr = res.data[data.selectInput][data.selectOutput]
				curr = curr * data.input
				setOutput({ ...output, currency: curr})
			})
	}

	const swapCurrency = () => {
		const tempInput = input 
		const tempOutput = output
		setInput(()=>tempOutput )
		setOutput(()=>tempInput)
		
	}

	return (
		<motion.div
			initial={{ width: 0 }}
			animate={{ width: "100vw" }}
			transition={{ duration: 1 }}
			className="w-full h-screen bg-cover bg-no-repeat flex justify-center items-center"
			style={{
				backgroundImage: `url(https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg
				)`,
			}}
		>
			<Container bg="green.200" borderRadius={12}>
				<form
					onSubmit={handleSubmit((data) => {
						convert(data)
					})}
					className="w-full flex-col justify-end items-end"
				>
					<Container
						bg="white"
						borderRadius={8}
						py={2}
						position="relative"
						top={5}
					>
						<div className="flex justify-between my-3">
							<Text>Form</Text>
							<Text>Currency Type</Text>
						</div>

						<div className="flex justify-between ">
							<Input
								id="input"
								w={1 / 3}
								value={input.currency}
								{...register("input", { valueAsNumber: true, required: true })}
								onChange={(e) =>
									setInput({ ...input, currency: e.target.value })
								}
							/>

							<Select
								w={1 / 3}
								id="selectInput"
								value={input.code}
								{...register("selectInput")}
								onChange={(v) => setInput({ ...input, code: v.target.value })}
							>
								<option>Choose Currency</option>
								{allCurrency.map((curr) => (
									<option value={curr} key={curr}>
										{curr.toUpperCase()}
									</option>
								))}
							</Select>
						</div>
					</Container>
					<div className="flex justify-center z-50 relative top-1">
						<Button
							px={6}
							bg="blue.300"
							size="md"
							leftIcon={<MdOutlineSwapVerticalCircle size={25} />}
							onClick={swapCurrency}
						>
							Swap
						</Button>
					</div>
					<Container
						bg="white"
						borderRadius={8}
						py={2}
						position="relative"
						top={-2}
					>
						<div className="flex justify-between my-3">
							<Text>To</Text>
							<Text>Currency Type</Text>
						</div>

						<div className="flex justify-between ">
							<Input
								placeholder="0.0"
								id="input"
								w={1 / 3}
								value={output.currency}
								readOnly
							/>
							<Select
								w={1 / 3}
								id="selectOutput"
								value={output.code}
								{...register("selectOutput")}
								onChange={(v) => setOutput({ ...output, code: v.target.value })}
							>
								<option>Choose Currency</option>
								{allCurrency.map((curr) => (
									<option value={curr} key={curr}>
										{curr.toUpperCase()}
									</option>
								))}
							</Select>
						</div>
					</Container>
					<div className="flex justify-center">
						<Button px={8} bg="blue.300" m={3} size="md" type="submit">
							Convert {input.code.toUpperCase()}{" "}
							{output.code && <span className="mx-1">to</span>}{" "}
							{output.code.toUpperCase()}
						</Button>
					</div>
					<div className="flex flex-col gap-1 mb-2">
						{errors.input && (
							<Alert status="error" borderRadius={6}>
								<AlertIcon />
								{errors.input.message}
							</Alert>
						)}
						{errors.selectInput && (
							<Alert status="error" borderRadius={6}>
								<AlertIcon />
								{errors.selectInput.message}
							</Alert>
						)}
						{errors.selectOutput && (
							<Alert status="error" borderRadius={6}>
								<AlertIcon />
								{errors.selectOutput.message}
							</Alert>
						)}
					</div>
				</form>
			</Container>
		</motion.div>
	)
}

export default Exchanger
