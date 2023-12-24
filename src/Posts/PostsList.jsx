import { useEffect, useState } from "react"
import PostItem from "./PostItem"
import axios from "axios"
import { motion } from 'framer-motion'
const PostsList = () => {
	const [posts, setPosts] = useState([])
	useEffect(() => {
		axios.get("https://jsonplaceholder.typicode.com/posts").then((allPosts) => {
			setPosts(() => allPosts.data)
		})
	}, [])
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className="flex flex-col items-center "
		>
			<div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
				{posts.map((post) => (
					<PostItem
						key={post.id}
						id={post.id}
						title={post.title}
						body={post.body}
					/>
				))}
			</div>
		</motion.div>
	)
}

export default PostsList
