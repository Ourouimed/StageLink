import axiosService from "@/utils/axiosService"

const updateProfile = async (data)=>{
    const respone = await axiosService.post(`/api/etudiant/update` , data , {
        withCredentials: true ,
    })
    
    return respone.data
}

const getProfile = async ()=>{
    const respone = await axiosService.get(`/api/etudiant`)
    return respone.data
}


const etudiantService = {updateProfile , getProfile}
export default etudiantService