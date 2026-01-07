import Etudiant from "../models/etudiant.js";

const updateProfile = async (req , res) => {
    try {
        const userId = req.user.id 
        const { nom , prenom , date_naissance , niveau_scolaire , ville  , bio  , website  , linkedin } = req.body

        if (!nom , !prenom , !date_naissance , !niveau_scolaire , !ville  , !bio){
            return res.status(400).json({ error: "Some required fields are empty" });
        }

        const formatedDN = new Date(date_naissance).toISOString().split('T')[0];

        await Etudiant.updateProfile(nom , prenom , formatedDN , niveau_scolaire , ville  , bio  , website  , linkedin , userId)
        const [etudiantInfo] = await Etudiant.getInfo(userId)


        if (!etudiantInfo){
            return res.status(404).json({error : 'Usser not found'})
        }

        const { id , ...profileInfo } = etudiantInfo
        return res.json({profile : profileInfo , message : 'Etudiant profile updated successfully'})

     }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


const getProfile = async (req , res) => {
    try {
        const userId = req.user.id 
        const [etudiantInfo] = await Etudiant.getInfo(userId)


        if (!etudiantInfo){
            return res.status(404).json({error : 'Usser not found'})
        }

        const { id , ...profileInfo } = etudiantInfo
        return res.json({profile : profileInfo , message : 'etudiant profile fetched successfully'})

     }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export { updateProfile , getProfile}