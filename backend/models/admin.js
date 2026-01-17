import db from '../config/db.js'


const Admin = {
    getUsers : async ()=>{
        const [rows] = await db.query(`SELECT u.id , u.email , u.role , u.blocked , u.email_verified , 
                                        COALESCE(
                                            CONCAT(etd.prenom, ' ', etd.nom),
                                            CONCAT(enc.prenom, ' ', enc.nom),
                                            ent.nom_entreprise
                                        ) AS nom from utilisateurs u
                                        left join etudiants etd on etd.id = u.id
                                        left join encadrants enc on enc.id = u.id
                                        left join entreprises ent on ent.id = u.id 
                                        where u.role != 'admin'`)
        return rows
    } ,
    blockUser : async (id)=> {
        await db.query('UPDATE utilisateurs set blocked = 1 where id = ?' , [id])
    },
    unblockUser : async (id)=> {
        await db.query('UPDATE utilisateurs set blocked = 0 where id = ?' , [id])
    } ,
    checkBlocked : async (id)=>{
        await db.query('SELECT blocked from utilisateurs')
    }
}

export default Admin