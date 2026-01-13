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


const getStages = async ()=>{
    const respone = await axiosService.get(`/api/entreprise/stages`)
    return respone.data
}


const addEncadrant = async (id)=>{
    const respone = await axiosService.post(`/api/entreprise/encadrants/add/${id}`)
    return respone.data
}


const declineCandidature = async (id)=>{
    const respone = await axiosService.post(`/api/entreprise/candidature/decline/${id}`)
    return respone.data
}



const acceptCandidature = async (id , encadrant)=>{
    const respone = await axiosService.post(`/api/entreprise/candidature/accept/${id}` , { encadrant})
    return respone.data
}





const addNoteEvaluation = async (id , note)=>{
    const respone = await axiosService.post(`/api/entreprise/stages/addNoteEvaluation/${id}` , { note })
    return respone.data
}


const endStage = async (id)=>{
    const respone = await axiosService.post(`/api/entreprise/stages/end/${id}` ,)
    return respone.data
}


const entrepriseService = {updateProfile , 
    getProfile , getCandidats , getEncadrants , addEncadrant , 
    getStages , declineCandidature , acceptCandidature  , addNoteEvaluation , endStage}
export default entrepriseService