const db = require('../config/db')


const Auth = {
    getUserByEmail : async (email)=>{
        const [rows] = await db.query('SELECT * from utilisateurs where email = ?' , [email])
        return rows
    },
    createUser : async (email, generatedId, hashedPass, role)=>{
        await db.query('CALL CreateUser(? , ? , ? , ?)' , [email, generatedId, hashedPass, role])
    },
    createEtudiant : async (id, nom, prenom, niveau_scolaire , date_naissance)=>{
        await db.query('CALL createEtudiant(? , ? , ? , ? , ?)' , [id, nom, prenom, niveau_scolaire , date_naissance])
    },
    createEncadrant : async (id, nom, prenom , date_naissance)=>{
        await db.query('CALL createEncadrant(? , ? , ? , ?)' , [id, nom, prenom , date_naissance])
    },
    createEntreprise : async (id, entreprise)=>{
        await db.query('CALL createEntreprise(? , ?)' , [id, entreprise])
    },
}


module.exports = Auth