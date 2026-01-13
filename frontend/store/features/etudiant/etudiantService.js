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



const getCandidatures = async ()=>{
    const respone = await axiosService.get(`/api/etudiant/candidatures`)
    return respone.data
}



const getStages = async ()=>{
    const respone = await axiosService.get(`/api/etudiant/stages`)
    return respone.data
}


const etudiantService = {updateProfile , getProfile , getCandidatures , getStages}
export default etudiantService