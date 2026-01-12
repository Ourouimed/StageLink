import Encadrant from "../models/encadrant.js";
import Entreprise from "../models/entreprise.js";

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
export { updateProfile , getProfile , getCandidats , getEncadrants, addEncadrant}