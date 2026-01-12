import axiosService from "@/utils/axiosService"

const getProfile = async ()=>{
    const respone = await axiosService.get(`/api/encadrant`)
    return respone.data
}



const encadrantService = { getProfile }  
export default encadrantService