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




const getStages = async ()=>{
    const respone = await axiosService.get(`/api/encadrant/stages`)
    return respone.data
}

const addNotePedagogique = async (id , note)=>{
    const respone = await axiosService.post(`/api/encadrant/stages/addNotePedagogique/${id}` , { note })
    return respone.data
}




const encadrantService = { getProfile , updateProfile ,
     getEntreprises , acceptEntrepriseRequest , declineEntrepriseRequest,
    addNotePedagogique , getStages}  
export default encadrantService