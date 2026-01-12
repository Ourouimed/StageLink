import db from '../config/db.js'

const Entreprise = {
    updateProfile : async (nom_entreprise , ville , type_entreprise , description , secteur , website = null , linkedin = null , id)=>{
        await db.query('UPDATE entreprises set nom_entreprise = ? , ville = ? , type_entreprise = ? , description = ? , secteur = ? , website = ? , linkedin = ? where id = ?' , 
            [nom_entreprise , ville , type_entreprise , description , secteur , website , linkedin , id])

    },

    getInfo : async (id)=>{
        const [rows] = await db.query('select * from entreprises where id = ?' , [id])
        return rows
    } 
    ,getCandidats : async (id)=>{
        const [rows] = await db.query(`select c.* from candidatures c 
                                       inner join offre_stage os on c.stage_id = os.id 
                                       inner join entreprises e on e.id = os.entreprise where os.entreprise = ?` , [id])
        return rows
    } ,
    getEncadrants : async (id)=>{
        const [rows] = await db.query(`select de.id_encadrant , de.status,  e.nom , e.prenom , de.joined_at from demande_encadrant de
                                       inner join encadrants e on de.id_encadrant = e.id where de.id_entreprise = ?
                                       ` , [id])
        return rows
    },
    getEncadrantById : async (id)=>{
        const [rows] = await db.query(`select de.id_encadrant , de.status,  e.nom , e.prenom , de.joined_at from demande_encadrant de
                                       inner join encadrants e on de.id_encadrant = e.id where e.id = ?
                                       ` , [id])
        return rows
    },
    addEncadrant : async (id_encadrant , id_entreprise)=>{
        await db.query('CALL addEncadrant (? , ?)' , [id_encadrant , id_entreprise])
    }
}


export default Entreprise