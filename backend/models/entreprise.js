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
}


export default Entreprise