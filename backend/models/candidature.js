import db from '../config/db.js'
const Candidature = {
    createCandidature : async (id_candidature , stage_id , etudiant_id)=>{
        await db.query('CALL AjouterCandidature(? , ? , ?)' , [id_candidature , stage_id , etudiant_id])
    },
    getCandidature : async (id)=>{
        const [rows] = await db.query('SELECT * FROM candidatures where id = ?' , [id])
        return rows
    }
}

export default Candidature