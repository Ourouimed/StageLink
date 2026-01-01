const db = require('../config/db')


const Auth = {
    getUserByEmail : async (email)=>{
        const [rows] = await db.query('SELECT * from utilisateurs where email = ?' , [email])
        return rows
    },
    getUserById : async (id)=>{
        const [rows] = await db.query('SELECT * from utilisateurs where id = ?' , [id])
        return rows
    },
    verifyEmail : async (id)=>{
        await db.query('UPDATE utilisateurs set email_verified = 1 , email_verified_at = NOW() where id=?' , [id])
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

    getEtudiantByUserId : async (id)=>{
        const [rows] = await db.query('SELECT * FROM etudiants where id = ?' , [id])
        return rows
    } ,
    getEncadrantByUserId : async (id)=>{
        const [rows] = await db.query('SELECT * FROM encadrants where id = ?' , [id])
        return rows
    } ,
    getEntrepriseByUserId : async (id)=>{
        const [rows] = await db.query('SELECT * FROM entreprise where id = ?' , [id])
        return rows
    }
}


module.exports = Auth