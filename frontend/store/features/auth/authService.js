import axios from "axios"
axios.defaults.withCredentials = true;

const register = async (data) => {
    const respone = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register` , data)
    return respone.data
}
const login = async (data) => {
    const respone = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login` , data)
    return respone.data
}

const verifyEmail = async (email , otp)=>{
    const respone = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email?email=${email}` , {otp})
    return respone.data
}

const verifySession = async ()=>{
    const respone = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-session`)
    return respone.data
}




const logout = async ()=>{
    const respone = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout` , {},
    { withCredentials: true }) 
    return respone.data
}

const resendOtp = async (email)=>{
    const respone = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-otp` , {email})
    return respone.data
}




const authService = { register , login , verifyEmail , verifySession , logout , resendOtp}
export default authService