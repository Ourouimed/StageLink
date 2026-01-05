import axiosService from "@/utils/axiosService"

const updateProfile = async (data)=>{
    const respone = await axiosService.post(`/api/entreprise/update` , data)
    return respone.data
}

const getProfile = async ()=>{
    const respone = await axiosService.get(`/api/entreprise`)
    return respone.data
}


const entrepriseService = {updateProfile , getProfile}
export default entrepriseService