const db = require('../config/db')


const Auth = {
    getUserByEmail : async (email)=>{
        const [rows] = await db.query('SELECT * from utilisateurs where email = ?' , [email])
        return rows
    },
    createUser : async (email, generatedId, hashedPass, role)=>{
        await db.query('CALL CreateUser(? , ? , ? , ?)' , [email, generatedId, hashedPass, role])
    }
}


module.exports = Auth