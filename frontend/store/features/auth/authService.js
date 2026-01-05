import axiosService from "@/utils/axiosService"


const register = async (data) => {
    const respone = await axiosService.post(`/api/auth/register` , data)
    return respone.data
}
const login = async (data) => {
    const respone = await axiosService.post(`/api/auth/login` , data)
    return respone.data
}

const verifyEmail = async (email , otp)=>{
    const respone = await axiosService.post(`/api/auth/verify-email?email=${email}` , {otp})
    return respone.data
}

const verifySession = async ()=>{
    const respone = await axiosService.get(`/api/auth/verify-session`)
    return respone.data
}




const logout = async ()=>{
    const respone = await axiosService.post(`/api/auth/logout` , {},
    { withCredentials: true }) 
    return respone.data
}

const resendOtp = async (email)=>{
    const respone = await axiosService.post(`/api/auth/resend-otp` , {email})
    return respone.data
}




const authService = { register , login , verifyEmail , verifySession , logout , resendOtp}
export default authService