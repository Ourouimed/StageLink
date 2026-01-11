import db from '../config/db.js'

const Etudiant = {
    updateProfile : async (nom , prenom , date_naissance , niveau_scolaire , ville  , bio  , website = null , linkedin = null , cvPdf , id)=>{
        await db.query('UPDATE etudiants set nom = ? , prenom = ? , date_naissance = ? , niveau_scolaire = ? , ville = ? , bio = ? , website = ? , linkedin = ? , cv = ? where id = ?' , 
            [nom , prenom , date_naissance , niveau_scolaire , ville  , bio , website , linkedin , cvPdf , id])

    },

    getInfo : async (id)=>{
        const [rows] = await db.query('select * from etudiants where id = ?' , [id])
        return rows
    }
}


export default Etudiant