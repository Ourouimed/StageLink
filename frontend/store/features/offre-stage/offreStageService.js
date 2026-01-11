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



const deleteStage = async (id)=>{
    const respone = await axiosService.delete(`/api/offre-stage/delete/${id}`)
    return respone.data
}







const offreStageService = {createOffre , getAllByEntreprise , getAll , deleteStage}
export default offreStageService