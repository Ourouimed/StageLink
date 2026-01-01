const Auth = require("../models/auth")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require("../lib/send-email");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const { v4: uuidv4 } = require('uuid');



exports.register = async (req, res) => {
    const { email, password, role } = req.body
    console.log(req.body)
    try {
        if (!email || !password || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (role === 'entreprise'){
            const { entreprise } = req.body
            if (!entreprise) {
                return res.status(400).json({ error: "All fields are required" });
            }
        }
        else {
            const { nom , prenom , date_naissance} = req.body
            if (!nom || !prenom || !date_naissance) {
                return res.status(400).json({ error: "All fields are required" });
            }
        }

        // Check User existance before create new One
        const [user] = await Auth.getUserByEmail(email)
        if (user) {
            return res.status(409).json({ error: 'Email already registred' })
        }

        // Create a secure Hashed Password using bcrypt
        const hashedPass = await bcrypt.hash(password, 10)

        // Generate a random uuid id
        const generatedId = uuidv4()

        // Create a new user
        await Auth.createUser(email, generatedId, hashedPass, role)



        // send a verification email 
        await sendVerificationEmail(generatedId, email)

        res.status(200).json({ message: 'User Created succesfully' })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }

}