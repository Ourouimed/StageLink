import db from '../config/db.js'
const Encadrant = {
     getInfo : async (id)=>{
        const [rows] = await db.query('select * from encadrants where id = ?' , [id])
        return rows
    }
}

export default Encadrant