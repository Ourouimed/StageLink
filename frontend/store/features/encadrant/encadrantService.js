import axiosService from "@/utils/axiosService"

const getProfile = async ()=>{
    const respone = await axiosService.get(`/api/encadrant`)
    return respone.data
}


const updateProfile = async (data)=>{
    const respone = await axiosService.post(`/api/encadrant/update` , data)
    return respone.data
}


const encadrantService = { getProfile , updateProfile}  
export default encadrantService