import db from '../config/db.js'

const Stage = {
    createStage : async (stageId , titre , entreprise , specialite , ville , type_stage , description , duree , nbr_places , demarage , disponibilite)=>{
        await db.query(`CALL create_stage(? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?) ` , [stageId , titre , entreprise , specialite , ville , type_stage , description , duree , nbr_places , demarage , disponibilite])
    } ,
    getStage : async (id)=>{
        const [rows] = await db.query(`SELECT s.titre , s.id as stage_id , e.nom_entreprise as entreprise ,  s.specialite , s.ville , s.type_stage , s.nombre_profiles , s.demarage , s.created_at , 
                                              s.description , s.duree_months , s.disponibilite from offre_stage s 
                                              inner join entreprises e on e.id = s.entreprise where s.id = ?` , [id])
        return rows 
    } ,
    getAllStagesByEntreprise: async (id)=>{
        const [rows] = await db.query(`SELECT s.titre , s.id as stage_id , e.nom_entreprise as entreprise ,  s.specialite , s.ville , s.type_stage , s.nombre_profiles , s.demarage , s.created_at , 
                                              s.description , s.duree_months , s.disponibilite from offre_stage s 
                                              inner join entreprises e on e.id = s.entreprise where e.id = ?` , [id])
        return rows 
    } ,
    getAllStages: async ()=>{
        const [rows] = await db.query(`SELECT s.titre , s.id as stage_id , e.nom_entreprise as entreprise ,  s.specialite , s.ville , s.type_stage , s.nombre_profiles , s.demarage , s.created_at , 
                                              s.description , s.duree_months , s.disponibilite from offre_stage s 
                                              inner join entreprises e on e.id = s.entreprise`)
        return rows 
    } 
} 


export default Stage