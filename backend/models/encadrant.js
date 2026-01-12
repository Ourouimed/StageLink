import db from '../config/db.js'
import { getEncadrants } from '../controllers/entrepriseController.js'
const Encadrant = {
     getInfo : async (id)=>{
        const [rows] = await db.query('select * from encadrants where id = ?' , [id])
        return rows
    } ,

    updateProfile : async (nom , prenom , date_naissance  , ville  , bio  , website = null , linkedin = null  , id)=>{
        await db.query('UPDATE encadrants set nom = ? , prenom = ? , date_naissance = ? , ville = ? , bio = ? , website = ? , linkedin = ?  where id = ?' , 
            [nom , prenom , date_naissance , ville  , bio , website , linkedin  , id])

    },
}

export default Encadrant