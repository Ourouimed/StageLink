import Candidature from "../models/candidature.js";
import { v4 as uuidv4} from 'uuid'

const createCandidature = async (req , res)=>{
    
    try {
        const user = req?.user
        const { id_stage } = req.body
        if (!id_stage){
            return res.status(400).json({ error: "Some required fields are empty" });
        }
        if (user?.role !== 'etudiant'){
            return res.status(401).json({ message: "Unauthorized , you d'ont have permision for this specific action" });
        }


       
        const candidatureId = uuidv4()
        await Candidature.createCandidature(candidatureId , id_stage , user.id)

        const [ candidature ] = await Candidature.getCandidature(candidatureId)
        if (!candidature) {
            return res.status(404).json({error : 'candidature unfound'})
        }

        return res.json({message : 'candidature added successfully' , candidature })

    }
     catch (err) {
        console.error(err);
        return res.status(500).json({ error: err?.sqlMessage || "Internal server error" });
    }
}



export { createCandidature}