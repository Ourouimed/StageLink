import { uploadFile } from "../lib/upload-file.js";
import Etudiant from "../models/etudiant.js";

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      nom,
      prenom,
      date_naissance,
      niveau_scolaire,
      ville,
      bio,
      website,
      linkedin
    } = req.body;

    // Validation obligatoire
    if (!nom || !prenom || !date_naissance || !niveau_scolaire || !ville || !bio) {
      return res.status(400).json({ error: "Some required fields are empty" });
    }

    // Vérification type PDF
    if (req.file && req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "CV must be a PDF file" });
    }

    // Récupérer l’étudiant existant
    const [existingEtudiant] = await Etudiant.getInfo(userId);
    if (!existingEtudiant) return res.status(404).json({ error: "User not found" });

    // Upload nouveau CV si présent, sinon garder l’ancien
    let cvPdf = existingEtudiant.cv;
    if (req.file) {
      console.log("Uploading CV...");
      cvPdf = await uploadFile(req.file, "CV");
      console.log("CV uploaded:", cvPdf);
    }

    if (!cvPdf){
        return res.status(400).json({error : 'Cv required!'})
    }

    //Format date
    const formattedDate = new Date(date_naissance).toISOString().split("T")[0];

    // Update profile
    await Etudiant.updateProfile(
      nom,
      prenom,
      formattedDate,
      niveau_scolaire,
      ville,
      bio,
      website || null,
      linkedin || null,
      cvPdf,
      userId
    );

    // Recharger profil
    const [updatedEtudiant] = await Etudiant.getInfo(userId);
    const { id, ...profileInfo } = updatedEtudiant;

    return res.json({
      profile: profileInfo,
      message: "Etudiant profile updated successfully"
    });

  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};




const uploadRapport = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      stage_id
    } = req.body;

    // Validation obligatoire
    if (!stage_id) {
      return res.status(400).json({ error: "Some required fields are empty" });
    }

    // Vérification type PDF
    if (req.file && req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "CV must be a PDF file" });
    }

    // Récupérer l’étudiant existant
    const [existingStage] = await Etudiant.getStage(stage_id);
    if (!existingStage) return res.status(404).json({ error: "Stage not found" });

    // Upload nouveau CV si présent, sinon garder l’ancien
    let rapport = existingStage.rapport_stage;
    if (req.file) {
      console.log("Uploading CV...");
      rapport = await uploadFile(req.file, "rapports_stages");
      console.log("Rapport uploaded:", rapport);
    }

    if (!rapport){
        return res.status(400).json({error : 'Rapport required!'})
    }

    await Etudiant.updateRapport(stage_id , rapport)
    // Recharger profil
    const [updatedStage] = await Etudiant.getStage(stage_id);


    return res.json({
      stage: updatedStage,
      message: "Rapport stage fetched successfully"
    });

  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


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

const getCandidatures = async (req , res)=>{
    try {
        let user = req.user
        const candidatures = await Etudiant.getCandidatures(user.id)
        console.log(candidatures)


       
        return res.json({candidatures , message : 'candidatures fetched successfully'})

    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
    
}


const getStages = async (req , res)=>{
   try {
        let user = req.user
        const stages = await Etudiant.getStages(user.id)
        console.log(stages)


       
        return res.json({stages , message : 'stages fetched successfully'})

    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }

}


export { updateProfile , getProfile , getCandidatures , getStages , uploadRapport}