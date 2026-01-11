import { v4 as uuidv4 } from "uuid" 
import Stage from "../models/stage.js"

const createStage = async (req , res)=>{
    
    try {
        const { titre , type_stage , specialite , ville , duree , nbr_places , description , demarage , disponibilite} = req.body
        const user = req?.user
        if (user?.role !== 'entreprise'){
            return res.status(401).json({ message: "Unauthorized , you d'ont have permision for this specific action" });
        }

        if (!titre || !type_stage || !specialite || !ville || !duree || !nbr_places || !description || !demarage || !disponibilite) {
            return res.status(400).json({ error: "Some required fields are empty" });
        }

        const demarageDate = new Date(demarage).toISOString().slice(0, 19).replace('T', ' ');

        const stageId = uuidv4()
        await Stage.createStage(stageId , titre , user.id , specialite , ville , type_stage , description , duree , nbr_places , demarageDate , disponibilite)

        const [ stage ] = await Stage.getStage(stageId)
        if (!stage) {
            return res.status(404).json({error : 'Stage unfound'})
        }

        return res.json({message : 'Stage added successfully' , stage })

    }
     catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const deleteStage = async (req , res)=>{
    try {
        const { id } = req.params
        if (!id){
            return res.status(400).json({ error: "Stage id is required" });
        }

        await Stage.deleteStage(id)
        return res.json({message : 'Stage supprimer avec success' , id})
    }   

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: err?.sqlMessage || "Internal server error" });
    }
    
}


const getAllStagesByEntreprise = async (req , res)=>{
    try {
        const user = req.user
        if (!user){
            return res.status(404).json({error : 'user not found'})
        }
        const stages = await Stage.getAllStagesByEntreprise(user.id)
        
        return res.json({message : 'Stage fetched successfully' , stages })
    }

     catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }

}


const getAllStage = async (req , res)=>{
      try {
        const user = req.user
        if (!user){
            return res.status(404).json({error : 'user not found'})
        }
        const stages = await Stage.getAllStages(user.id)
        
        return res.json({message : 'Stage fetched successfully' , stages })
    }

     catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}
export { createStage , getAllStage , getAllStagesByEntreprise , deleteStage}