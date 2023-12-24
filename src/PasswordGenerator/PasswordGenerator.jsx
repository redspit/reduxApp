import {
	Button,
	Container,
	Input,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Divider,
	Checkbox,
	Text,
	useToast,
} from "@chakra-ui/react"
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from "react"
import { MdContentCopy } from "react-icons/md"

const PasswordGenerator = () => {
	const [passwordConfig, setPasswordConfig] = useState({
		length: 8,
		numbers: false,
		characters: false,
	})
	const [password, setPassword] = useState("")

	const copyText = useRef(null)
	const toast = useToast()
	useEffect(() => {
		generatePassowrd()
	}, [passwordConfig])

	const generatePassowrd = () => {
		let num = ""
		let char = ""
		const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
		num = passwordConfig.numbers ?  "0123456789" :  ""
		char = passwordConfig.characters ? "!@#$%^&*()" : ""
		const pass = letters + num + char
		var passwordLength = passwordConfig.length
		var genPassword = ""
		for (var i = 0; i <= passwordLength - 1; i++) {
			var randomNumber = Math.floor(Math.random() * pass.length)
			genPassword += pass.substring(randomNumber, randomNumber + 1)
		}
		setPassword(() => genPassword)
	}

	const copyPassowrd = () => {
		copyText.current.select()
		copyText.current.setSelectionRange(0, 99999)
		navigator.clipboard.writeText(copyText.current.value)
		toast({
			title: "Password Copied.",
			description: copyText.current.value,
			status: "success",
			duration: 3000,
			isClosable: true,
		})
	}
	return (
		<motion.div
			initial={{ width: 0 }}
			animate={{ width: "100vw" }}
			transition={{ duration: 1 }}
		>
			<Container bg="gray.700" py={5} px={6} borderRadius={10} maxW="2xl">
				<div className="flex justify-between gap-5 mb-2">
					<Input
						placeholder="Password"
						bg="whiteAlpha.800"
						color="green.600"
						fontSize={20}
						fontWeight="bold"
						px={5}
						py={2}
						borderRadius={5}
						ref={copyText}
						value={password}
						isReadOnly
					></Input>
					<Button
						leftIcon={<MdContentCopy />}
						colorScheme="green"
						variant="solid"
						px={8}
						onClick={copyPassowrd}
					>
						Copy
					</Button>
				</div>
				<Divider orientation="horizontal" />
				<div className="flex justify-start gap-5 mt-4">
					<div className="w-1/4">
						<Slider
							defaultValue={8}
							min={3}
							max={32}
							step={1}
							onChange={(value) =>
								setPasswordConfig({
									...passwordConfig,
									length: value,
								})
							}
						>
							<SliderTrack bg="green.100">
								<SliderFilledTrack bg="green" />
							</SliderTrack>
							<SliderThumb boxSize={6} />
						</Slider>
					</div>
					<Text color="green.400">Length: {passwordConfig.length}</Text>
					<Checkbox
						color="green.400"
						onChange={() =>
							setPasswordConfig({
								...passwordConfig,
								numbers: !passwordConfig.numbers,
							})
						}
					>
						Numbers
					</Checkbox>
					<Checkbox
						color="green.400"
						onChange={() =>
							setPasswordConfig({
								...passwordConfig,
								characters: !passwordConfig.characters,
							})
						}
					>
						Characters
					</Checkbox>
				</div>
			</Container>
		</motion.div>
	)
}

export default PasswordGenerator
