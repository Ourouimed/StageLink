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


const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      nom,
      prenom,
      date_naissance,
      ville,
      bio,
      website,
      linkedin
    } = req.body;


    // Validation obligatoire
    if (!nom || !prenom || !date_naissance || !ville || !bio) {
      return res.status(400).json({ error: "Some required fields are empty" });
    }

    
    // Récupérer L'encadrant existant
    const [existingEncadrant] = await Encadrant.getInfo(userId);
    if (!existingEncadrant) return res.status(404).json({ error: "User not found" });


    //Format date
    const formattedDate = new Date(date_naissance).toISOString().split("T")[0];

    // Update profile
    await Encadrant.updateProfile(
      nom,
      prenom,
      formattedDate,
      ville,
      bio,
      website || null,
      linkedin || null,
      userId
    );

    // Recharger profil
    const [updatedEncadrant] = await Encadrant.getInfo(userId);
    const { id, ...profileInfo } = updatedEncadrant;

    return res.json({
      profile: profileInfo,
      message: "Etudiant profile updated successfully"
    });

  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export { getProfile , updateProfile}