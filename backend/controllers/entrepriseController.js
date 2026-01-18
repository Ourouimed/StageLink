import Encadrant from "../models/encadrant.js";
import Entreprise from "../models/entreprise.js";
import { v4 as uuidv4} from 'uuid'

const updateProfile = async (req , res) => {
    try {
        const userId = req.user.id 
        const { entreprise , ville , type , description , secteur , website  , linkedin } = req.body

        if (!entreprise , !ville , !type , !description , !secteur){
            return res.status(400).json({ error: "Some required fields are empty" });
        }

        await Entreprise.updateProfile(entreprise , ville , type , description , secteur , website  , linkedin , userId)
        const [entrepriseInfo] = await Entreprise.getInfo(userId)


        if (!entrepriseInfo){
            return res.status(404).json({error : 'Usser not found'})
        }

        const { id , ...profileInfo } = entrepriseInfo
        return res.json({profile : profileInfo , message : 'Entreprise profile updated successfully'})

     }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


const getProfile = async (req , res) => {
    try {
        const userId = req.user.id 
        const [entrepriseInfo] = await Entreprise.getInfo(userId)

       


        if (!entrepriseInfo){
            return res.status(404).json({error : 'Usser not found'})
        }

        const { id , ...profileInfo } = entrepriseInfo
        return res.json({profile : profileInfo , message : 'Entreprise profile fetched successfully'})

     }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const addEncadrant = async (req , res)=>{
    try {
        const { id } = req.params
        const user = req.user
        if (!id){
            return res.status(404).json({error : 'id is required'})
        }

        const [encadrantExist] = await Encadrant.getInfo(id)

        if(!encadrantExist){
            return res.status(404).json({error : 'Encadrant not found'})
        }

    

        await Entreprise.addEncadrant(id , user.id)
        const [encadrant] = await Entreprise.getEncadrantById(id)

        res.json({encadrant , message : 'Encadrant added successfully'})
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.sqlMessage || "Internal server error" });
    }
    
}


const getCandidats = async (req , res)=>{
    try {
        let user = req.user
        const candidats = await Entreprise.getCandidats(user.id)
        console.log(candidats)


       
        return res.json({candidats , message : 'candidats fetched successfully'})

    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
    
}


const getStages = async (req , res)=>{
   try {
        let user = req.user
        const stages = await Entreprise.getStages(user.id)
        console.log(stages)


       
        return res.json({stages , message : 'stages fetched successfully'})

    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }

}


const accepterCandidature = async (req , res)=>{
    try {
        const user = req.user
        const { id } = req.params
        const { encadrant } = req.body
        if (!id || !encadrant) return res.status(400).json({error : 'Missed data'})

        await Entreprise.changeCandidatureStatus(id , 'accepted')

        const stageId = uuidv4()
        await Entreprise.createStage(stageId , id , encadrant)

        const [stage] = await Entreprise.getStage(stageId)
        return res.json({stage , message : 'candidature accepted'})
    }   
     catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.sqlMessage || "Internal server error" });
    }
}


const declineCandidature = async (req , res)=>{
    try {
        const user = req.user
        const { id } = req.params
        if (!id) return res.status(400).json({error : 'Id is required'})

        await Entreprise.changeCandidatureStatus(id , 'declined')
        return res.json({message : 'Candidature refusee' , candidature_id : id})
    }   
     catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


const getEncadrants = async (req , res)=>{
    try {
        let user = req.user
        const encadrants = await Entreprise.getEncadrants(user.id)
        console.log(encadrants)


       
        return res.json({encadrants , message : 'encadrants fetched successfully'})

    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
    
}



const addNoteEvaluation = async (req , res)=>{
    const { id } = req.params
    const { note } = req.body



    if (!id || isNaN(note)) return res.status(400).json({error : 'Missed fields'})
    if (note < 0 || note > 20) return res.status(409).json({error : 'Note must be between 0 and 20'})


    const [checkFinished ] = await Entreprise.getStage(id) 
    if (!checkFinished){
        return res.status(404).json({error : 'Stage unfound'})
    }


     if (checkFinished.status === 'finished'){
        return res.status(409).json({error : 'Stage finished cannot update note'})
    }
    await Entreprise.updateNoteEvaluation(id , note)
    await Entreprise.updateNoteFinal(id)
    const [stage] = await Entreprise.getStage(id)

    return res.json({stage , message : 'Note attribue avec success'})
}


const endStage = async (req , res)=>{
    const { id } = req.params
    if(!id) return res.status(404).json({error : 'Id is required'})

    await Entreprise.endStage(id)
    const [stage] = await Entreprise.getStage(id)

    return res.json({stage , message : 'Stage Terminee'})
}


export { updateProfile , getProfile , getCandidats , getEncadrants, addEncadrant , 
    accepterCandidature , declineCandidature , getStages , addNoteEvaluation , endStage}