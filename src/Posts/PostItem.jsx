
const PostItem = ({ title, body, id }) => {
	return (
		<div className="border shadow-xl rounded-lg m-3 p-3 backdrop-blur-sm bg-slate-300 border-gray-600">
			<div className=" flex">
				<div className="text-black font-bold">ID: </div>
				<div className="ml-1 text-skay-400 font-semibold">{id}</div>
			</div>
			<div className=" flex">
				<div className="text-black font-bold">Title: </div>
				<div className="ml-1 text-green-700 font-semibold">{title}</div>
			</div>
			<div className="flex">
				<div className="text-black font-bold">Article: </div>
				<div className="ml-1 font-semibold	text-blue-800">{body}</div>
			</div>
		</div>
	)
}

export default PostItem
