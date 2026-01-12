import axiosService from "@/utils/axiosService"

const updateProfile = async (data)=>{
    const respone = await axiosService.post(`/api/entreprise/update` , data)
    return respone.data
}

const getProfile = async ()=>{
    const respone = await axiosService.get(`/api/entreprise`)
    return respone.data
}


const getCandidats = async ()=>{
    const respone = await axiosService.get(`/api/entreprise/candidats`)
    return respone.data
}

const getEncadrants = async ()=>{
    const respone = await axiosService.get(`/api/entreprise/encadrants`)
    return respone.data
}



const addEncadrant = async (id)=>{
    const respone = await axiosService.post(`/api/entreprise/encadrants/add/${id}`)
    return respone.data
}


const entrepriseService = {updateProfile , getProfile , getCandidats , getEncadrants , addEncadrant}
export default entrepriseService