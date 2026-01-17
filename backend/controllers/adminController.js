import Admin from "../models/admin.js"

const getUsers = async (req , res)=>{
    try {
        const user = req.user
        if (user.role !== 'admin'){
            return res.status(409).json({
                error : "Unauthorized , you havn't acces to this"
            })
        }

        const users = await Admin.getUsers()
        res.json({users  , message : 'Users fetched successfully'})
    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: err?.sqlMessage || "Internal server error" });
    }
    
}

const changeUserStatus = async (req , res)=>{
    try {
        const user = req.user
        const { blocked } = req.body
        const { id } = req.params
        if (user.role !== 'admin'){
            return res.status(409).json({
                error : "Unauthorized , you havn't acces to this"
            })
        }

        
        if (!id ){
            return res.status(400).json({error : 'Id is required'})
        }

        if (blocked){
            await Admin.unblockUser(id)
        }
        else {
            await Admin.blockUser(id)
        }

        const users = await Admin.getUsers()
        res.json({users  , message : 'Users status changed'})

        
    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: err?.sqlMessage || "Internal server error" });
    }
}

export { getUsers , changeUserStatus }