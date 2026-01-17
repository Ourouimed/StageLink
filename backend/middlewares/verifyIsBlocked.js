import Admin from "../models/admin.js";

const checkBlocked = async (req, res, next) => {
  const id = req.user.id

  try {
    const {blocked} = await Admin.checkBlocked(id)

    if (blocked){
        return res.status(403).json({error : 'Your account is blocked'})
    }
    next();
  }

  catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default checkBlocked;
