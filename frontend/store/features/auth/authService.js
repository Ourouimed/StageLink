import axios from "axios"
axios.defaults.withCredentials = true;

const register = async (data) => {
    const respone = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register` , data)
    return respone.data
}
export const authService = { register }