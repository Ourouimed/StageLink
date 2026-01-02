import jwt from 'jsonwebtoken'
const verifyJWT = (req, res, next) => {
  const token = req.cookies?.token 

  if (!token) {
    return res.status(401).json({ error: 'Session expired or invalid. Please login again.' });
   }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyJWT