import db from '../config/db.js'

const Etudiant = {
    updateProfile : async (nom , prenom , date_naissance , niveau_scolaire , ville  , bio  , website = null , linkedin = null , cvPdf , id)=>{
        await db.query('UPDATE etudiants set nom = ? , prenom = ? , date_naissance = ? , niveau_scolaire = ? , ville = ? , bio = ? , website = ? , linkedin = ? , cv = ? where id = ?' , 
            [nom , prenom , date_naissance , niveau_scolaire , ville  , bio , website , linkedin , cvPdf , id])

    },

    getInfo : async (id)=>{
        const [rows] = await db.query('select * from etudiants where id = ?' , [id])
        return rows
    } ,



    getCandidatures : async (id)=>{
        const [rows] = await db.query(`select c.* , e.nom_entreprise , os.ville , e.ville as ville_entreprise , e.secteur , e.id as entreprise_id , e.type_entreprise  , e.website , e.linkedin , os.titre , os.ville , os.demarage from candidatures c 
                                       inner join offre_stage os on c.stage_id = os.id 
                                       inner join entreprises e on e.id = os.entreprise where c.etudiant_id = ?` , [id])
        return rows
    } ,





     getStages : async(id)=>{
        const [rows] = await db.query(`SELECT st.stage_id , st.note_evaluation , 
                        st.note_pedagogique , st.note_final , st.status ,
                        os.titre , os.specialite , os.type_stage , os.disponibilite ,
                        ent.nom_entreprise as entreprise ,
                        concat(enc.nom , ' ' , enc.prenom) as encadrant from stages st
                        inner join candidatures c on c.id = st.candidature_id 
                        inner join etudiants etd on c.etudiant_id = etd.id 
                        inner join encadrants enc on st.encadrant_id = enc.id 
                        inner join offre_stage os on os.id = c.stage_id 
                        inner join entreprises ent on ent.id = os.entreprise
                        where etd.id = ?` ,[id]) 
        return rows
    } ,
}


export default Etudiant