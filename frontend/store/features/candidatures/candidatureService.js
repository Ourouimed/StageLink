import axiosService from "@/utils/axiosService"

const createCandidature = async (id_stage)=>{
    const respone = await axiosService.post(`/api/candidature/create` , {id_stage})
    return respone.data
}


const candidatureService = {createCandidature }
export default candidatureService