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
        const [rows] = await db.query(`select c.* ,etd.nom , os.titre , os.ville , os.demarage , etd.prenom from candidatures c 
                                        inner join etudiants etd on c.etudiant_id = etd.id
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
    },
    getAcceptedEncadrants : async (id)=>{
        const [rows] = await db.query(`select de.id_encadrant , de.status,  e.nom , e.prenom , de.joined_at from demande_encadrant de
                                       inner join encadrants e on de.id_encadrant = e.id where de.id_entreprise = ? AND status = 'accepted'
                                       ` , [id])
        return rows
    } ,

    changeCandidatureStatus : async(candidature_id , status)=>{
        await db.query('UPDATE candidatures set status = ? where id = ?' , [status , candidature_id])
    },

    createStage : async (id_stage , id_candidature , id_encadrant)=>{
        await db.query('CALL CreateStage(? , ? , ?)' , [id_stage , id_candidature , id_encadrant])
    } ,

    getStage : async(id)=>{
        const [rows] = await db.query(`SELECT st.stage_id , st.status , 
                        concat(etd.nom , ' ' , etd.prenom) as etudiant ,
                        concat(enc.nom , ' ' , enc.prenom) as encadrant from stages st
                        inner join candidatures c on c.id = st.candidature_id 
                        inner join etudiants etd on c.etudiant_id = etd.id 
                        inner join encadrants enc on st.encadrant_id = enc.id 
                        where st.stage_id = ?` ,[id]) 
        return rows
    }
}


export default Entreprise