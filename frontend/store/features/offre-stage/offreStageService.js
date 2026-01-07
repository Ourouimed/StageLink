import axiosService from "@/utils/axiosService"

const createOffre = async (data)=>{
    const respone = await axiosService.post(`/api/offre-stage/create` , data)
    return respone.data
}


const getAll = async (data)=>{
    const respone = await axiosService.get(`/api/offre-stage`)
    return respone.data
}

const offreStageService = {createOffre , getAll}
export default offreStageService