import db from '../config/db.js'
const Encadrant = {
     getInfo : async (id)=>{
        const [rows] = await db.query('select * from encadrants where id = ?' , [id])
        return rows
    } ,

    updateProfile : async (nom , prenom , date_naissance  , ville  , bio  , website = null , linkedin = null  , id)=>{
        await db.query('UPDATE encadrants set nom = ? , prenom = ? , date_naissance = ? , ville = ? , bio = ? , website = ? , linkedin = ?  where id = ?' , 
            [nom , prenom , date_naissance , ville  , bio , website , linkedin  , id])

    },
    getEntreprises : async (id)=>{
        const [rows] = await db.query(`select de.id_entreprise ,  de.status,  e.nom_entreprise , de.joined_at from demande_encadrant de
                                       inner join entreprises e on de.id_entreprise = e.id 
                                       inner join encadrants ec on ec.id = de.id_encadrant where de.id_encadrant = ?
                                       ` , [id])
        return rows
    },

    changeDemandeStatus : async(entreprise_id , encadrant_id , status)=>{
        await db.query('UPDATE demande_encadrant set status = ? where id_encadrant = ? AND id_entreprise = ?' , [status , encadrant_id , entreprise_id])
    }
}

export default Encadrant