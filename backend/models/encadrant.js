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
    } ,




    getStages : async(id)=>{
        const [rows] = await db.query(`SELECT st.stage_id , st.note_evaluation , 
                        st.note_pedagogique , st.note_final , st.status ,
                        os.titre , os.specialite , os.type_stage , os.disponibilite ,
                        concat(etd.nom , ' ' , etd.prenom) as etudiant ,
                        concat(enc.nom , ' ' , enc.prenom) as encadrant from stages st
                        inner join candidatures c on c.id = st.candidature_id 
                        inner join etudiants etd on c.etudiant_id = etd.id 
                        inner join encadrants enc on st.encadrant_id = enc.id 
                        inner join offre_stage os on os.id = c.stage_id 
                        inner join entreprises ent on ent.id = os.entreprise
                        where enc.id = ?` ,[id]) 
        return rows
    } ,

    getStage : async(id)=>{
        const [rows] = await db.query(`SELECT st.stage_id , st.note_evaluation , st.note_pedagogique , st.note_final , 
                        st.status , os.titre , os.specialite , os.type_stage , os.disponibilite ,
                        concat(etd.nom , ' ' , etd.prenom) as etudiant ,
                        concat(enc.nom , ' ' , enc.prenom) as encadrant from stages st
                        inner join candidatures c on c.id = st.candidature_id 
                        inner join offre_stage os on os.id = c.stage_id 
                        inner join etudiants etd on c.etudiant_id = etd.id 
                        inner join encadrants enc on st.encadrant_id = enc.id 
                        where st.stage_id = ?` ,[id]) 
        return rows
    } ,


    updateNotePedagogique : async (id , note)=>{
        await db.query('UPDATE STAGES SET note_pedagogique = ? where stage_id =?' , [note , id])
    }
}

export default Encadrant