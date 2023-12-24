import axios, { CanceledError } from 'axios'
const instance = axios.create({
    baseURL: "http://localhost:3500/",
})

instance.defaults.headers.common['Authorization'] = 'Basic'
instance.defaults.headers.post['Content-Type'] = 'application/json'

instance.interceptors.request.use((request) => {
	console.log(request)
	return request
})

export default instance
export { CanceledError }