import Encadrant from "../models/encadrant.js"

const getProfile = async (req , res) => {
    try {
        const userId = req.user.id 
        const [encadrantInfo] = await Encadrant.getInfo(userId)


        if (!encadrantInfo){
            return res.status(404).json({error : 'Usser not found'})
        }

        const { id , ...profileInfo } = encadrantInfo
        return res.json({profile : profileInfo , message : 'encadrant profile fetched successfully'})

     }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export { getProfile }