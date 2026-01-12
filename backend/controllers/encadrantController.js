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




const getEntreprises = async (req , res)=>{
    try {
        let user = req.user
        const entreprises = await Encadrant.getEntreprises(user.id)
        console.log(entreprises)


       
        return res.json({entreprises , message : 'entreprises fetched successfully'})

    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
    
}




const acceptRequest = async (req , res)=>{
    try {
        let user = req.user
        const { id : entreprise_id} = req.params
        if (!entreprise_id) return res.status(400).json({error : 'Id is required'})

        await Encadrant.changeDemandeStatus(entreprise_id , user.id , 'accepted')
        return res.json({message : 'Offre acceptee' , ids : {entreprise_id , encadrant_id : req.id}})
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


const declineRequest = async (req , res)=>{
    try {
        let user = req.user
        const { id : entreprise_id} = req.params
        if (!entreprise_id) return res.status(400).json({error : 'Id is required'})

        await Encadrant.changeDemandeStatus(entreprise_id , user.id , 'declined')
        return res.json({message : 'Offre refusee' , ids : {entreprise_id , encadrant_id : req.id}})
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}



const getStages = async (req , res)=>{
   try {
        let user = req.user
        const stages = await Encadrant.getStages(user.id)
        console.log(stages)
        console.log('fffff')


       
        return res.json({stages , message : 'stages fetched successfully'})

    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }

}



const addNotePedagogique = async (req , res)=>{
    const { id } = req.params
    const { note } = req.body


    console.log(id)
    console.log(note)

    if (!id || isNaN(note)) return res.status(400).json({error : 'Missed fields'})
    if (note < 0 || note > 20) return res.status(409).json({error : 'Note must be between 0 and 20'})


    await Encadrant.updateNotePedagogique(id , note)
    const [stage] = await Encadrant.getStage(id)

    return res.json({stage , message : 'Note attribue avec success'})
}

export { getProfile , updateProfile , getEntreprises , acceptRequest ,
    addNotePedagogique , declineRequest , getStages}