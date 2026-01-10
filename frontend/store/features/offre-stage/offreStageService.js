import axiosService from "@/utils/axiosService"

const createOffre = async (data)=>{
    const respone = await axiosService.post(`/api/offre-stage/create` , data)
    return respone.data
}


const getAllByEntreprise = async ()=>{
    const respone = await axiosService.get(`/api/offre-stage/entrepsie`)
    return respone.data
}

const getAll = async ()=>{
    const respone = await axiosService.get(`/api/offre-stage`)
    return respone.data
}

const offreStageService = {createOffre , getAllByEntreprise , getAll}
export default offreStageService