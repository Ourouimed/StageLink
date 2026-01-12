import axiosService from "@/utils/axiosService"

const getProfile = async ()=>{
    const respone = await axiosService.get(`/api/encadrant`)
    return respone.data
}


const updateProfile = async (data)=>{
    const respone = await axiosService.post(`/api/encadrant/update` , data)
    return respone.data
}

const getEntreprises = async ()=>{
    const respone = await axiosService.get(`/api/encadrant/entreprises`)
    return respone.data
}


const acceptEntrepriseRequest = async (id)=>{
    const respone = await axiosService.post(`/api/encadrant/entreprises/accept/${id}`)
    return respone.data
}


const declineEntrepriseRequest = async (id)=>{
    const respone = await axiosService.post(`/api/encadrant/entreprises/decline/${id}`)
    return respone.data
}




const encadrantService = { getProfile , updateProfile , getEntreprises , acceptEntrepriseRequest , declineEntrepriseRequest}  
export default encadrantService