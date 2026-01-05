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


export { updateProfile , getProfile}