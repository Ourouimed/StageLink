import axiosService from "@/utils/axiosService"
const getUsers = async ()=>{
    const respone = await axiosService.get(`/api/admin/users`)
    return respone.data
}


const changeUserStatus = async (id , blocked)=>{
    const respone = await axiosService.post(`/api/admin/users/statusChange/${id}` , {blocked})
    return respone.data
}


const adminService = { getUsers , changeUserStatus}
export default adminService