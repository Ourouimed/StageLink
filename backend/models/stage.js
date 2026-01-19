import db from '../config/db.js'

const Stage = {
    createStage: async (stageId, titre, entreprise, specialite, ville, type_stage, description, duree, nbr_places, demarage, disponibilite) => {
        await db.query(`CALL create_stage(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [stageId, titre, entreprise, specialite, ville, type_stage, description, duree, nbr_places, demarage, disponibilite]);
    },

    updateStage: async (stageId, titre, entreprise, specialite, ville, type_stage, description, duree, nbr_places, demarage, disponibilite) => {
        await db.query(`CALL update_stage(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [stageId, titre, entreprise, specialite, ville, type_stage, description, duree, nbr_places, demarage, disponibilite]);
    },

    getStage: async (id) => {
        const [rows] = await db.query(`
            SELECT 
                s.id AS stage_id,
                e.id AS entreprise_id,
                s.titre,
                s.specialite,
                s.ville,
                s.type_stage,
                s.nombre_profiles,
                s.demarage,
                s.created_at,
                s.description,
                s.duree_months,
                s.disponibilite,
                COUNT(c.id) AS nombre_candidatures
            FROM offre_stage s
            INNER JOIN entreprises e ON e.id = s.entreprise
            LEFT JOIN candidatures c ON c.stage_id = s.id
            WHERE s.id = ?
            GROUP BY s.id
        `, [id]);

        return rows
    },

    getAllStagesByEntreprise: async (id) => {
        const [rows] = await db.query(`
            SELECT 
                s.id AS stage_id,
                e.id AS entreprise_id,
                s.titre,
                s.specialite,
                s.ville,
                s.type_stage,
                s.nombre_profiles,
                s.demarage,
                s.created_at,
                s.description,
                s.duree_months,
                s.disponibilite, 
                s.demarage > utc_timestamp() as archived ,
                COUNT(c.id) AS nombre_candidatures
            FROM offre_stage s
            INNER JOIN entreprises e ON e.id = s.entreprise
            LEFT JOIN candidatures c ON c.stage_id = s.id
            WHERE e.id = ?
            GROUP BY s.id
            ORDER BY demarage
        `, [id]);

        return rows;
    },

    getAllStages: async () => {
        const [rows] = await db.query(`
            SELECT 
                s.id AS stage_id,
                e.id AS entreprise_id,
                s.titre,
                COUNT(c.id) AS nombre_candidatures,
                s.specialite,
                s.ville,
                s.type_stage,
                s.nombre_profiles,
                s.demarage,
                s.created_at,
                s.description,
                s.duree_months,
                s.disponibilite
            FROM offre_stage s
            INNER JOIN entreprises e ON e.id = s.entreprise
            LEFT JOIN candidatures c ON c.stage_id = s.id
            GROUP BY s.id 
            having s.demarage > utc_timestamp()
            ORDER BY demarage
        `);

        return rows;
    },

    deleteStage: async (id) => {
        await db.query('DELETE FROM offre_stage WHERE id = ?', [id]);
    } ,

    traiter_offre_stage : async ()=>{
        await db.query('call traiter_offre_stage()')
    }
};


export default Stage