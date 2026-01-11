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