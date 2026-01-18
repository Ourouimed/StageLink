import Auth from "../models/auth.js"
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from "uuid" 
import { sendVerificationEmail } from "../lib/send-email.js"
import jwt from 'jsonwebtoken'
import { generateValidationCode } from "../lib/generate-randomCode.js"
import Admin from "../models/admin.js"
const JWT_SECRET = process.env.JWT_SECRET

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Basic validation
    if (!email || !password || !role) {
      return res.status(400).json({ error: "Email, password, and role are required" });
    }

    // Role-specific validation
    let roleData = {};
    switch (role) {
      case "entreprise":
        const { entreprise } = req.body;
        if (!entreprise) {
          return res.status(400).json({ error: "Entreprise name is required for role 'entreprise'" });
        }
        roleData = { entreprise };
        break;

      case "etudiant":
        const { nom, prenom, date_naissance, niveau_scolaire } = req.body;
        if (!nom || !prenom || !date_naissance || !niveau_scolaire) {
          return res.status(400).json({ error: "All student fields are required" });
        }
        roleData = { nom, prenom, date_naissance, niveau_scolaire };
        break;

      case "encadrant":
        const { nom: encNom, prenom: encPrenom, date_naissance: encDate } = req.body;
        if (!encNom || !encPrenom || !encDate) {
          return res.status(400).json({ error: "All mentor fields are required" });
        }
        roleData = { nom: encNom, prenom: encPrenom, date_naissance: encDate };
        break;

      default:
        return res.status(400).json({ error: "Invalid role provided" });
    }

    // Check if user already exists
    const [existingUser] = await Auth.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique ID
    const userId = uuidv4();

    // Create user in Auth table
    await Auth.createUser(email, userId, hashedPassword, role);

    // Role-specific creation
    if (role === "etudiant") {
      const { nom, prenom, niveau_scolaire, date_naissance } = roleData;
      await Auth.createEtudiant(userId, nom, prenom, niveau_scolaire, date_naissance);
    } else if (role === "encadrant") {
      const { nom, prenom, date_naissance } = roleData;
      await Auth.createEncadrant(userId, nom, prenom, date_naissance);
    } else if (role === "entreprise") {
      await Auth.createEntreprise(userId, roleData.entreprise);
    }

    // Send verification email
    const code = generateValidationCode();

    const hashedCode = await bcrypt.hash(code, 10);
    await Auth.saveVerificationCode(userId , hashedCode)
    await sendVerificationEmail(email , code);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user exists
    const [user] = await Auth.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }


    const {blocked} = await Admin.checkBlocked(user.id)

    if (blocked){
        return res.status(403).json({error : 'Your account is blocked'})
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if email is verified
    if (!user.email_verified) {
      return res.status(403).json({ error: "Please verify your email before login!" });
    }

    // Generate JWT token
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Fetch role-specific data
    let roleData = {};
    switch (user.role) {
      case "etudiant":
        const [etudiant] = await Auth.getEtudiantByUserId(user.id);
        roleData = {
          nom: etudiant.nom,
          prenom: etudiant.prenom,
          niveau_scolaire: etudiant.niveau_scolaire,
          date_naissance: etudiant.date_naissance,
        };
        break;

      case "encadrant":
        const [encadrant] = await Auth.getEncadrantByUserId(user.id);
        roleData = {
          nom: encadrant.nom,
          prenom: encadrant.prenom,
          date_naissance: encadrant.date_naissance,
        };
        break;


      case "admin":
        const [admin] = await Auth.getAdminById(user.id);
        roleData = {
          nom: admin.nom,
          prenom: admin.prenom,
          date_naissance: admin.date_naissance,
        };
        break;

      case "entreprise":
        const [entreprise] = await Auth.getEntrepriseByUserId(user.id);
        roleData = {
          entreprise: entreprise.nom,
        };
        break;
    }


    // Send HttpOnly cookie and role-specific data
    return res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
      maxAge: 3600000,
    }).json({
      message: "Login successful",
      data: {
        email: user.email,
        role: user.role,
        ...roleData,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const verifySession = async (req, res) => {
    try {
        // Fetch user
        const [user] = await Auth.getUserById(req.user.id); 
        if (!user) {
            return res.status(401).json({ error: 'Session expired or invalid. Please login again.' });
        }

        // Role-specific data
        let roleData = {};
        switch (user.role) {
            case "etudiant":
                const [etudiant] = await Auth.getEtudiantByUserId(user.id);
                roleData = {
                    nom: etudiant.nom,
                    prenom: etudiant.prenom,
                    niveau_scolaire: etudiant.niveau_scolaire,
                    date_naissance: etudiant.date_naissance,
                };
                break;

            case "encadrant":
                const [encadrant] = await Auth.getEncadrantByUserId(user.id);
                roleData = {
                    nom: encadrant.nom,
                    prenom: encadrant.prenom,
                    date_naissance: encadrant.date_naissance,
                };
                break;

            case "admin":
              const [admin] = await Auth.getAdminById(user.id);
              roleData = {
                nom: admin.nom,
                prenom: admin.prenom,
                date_naissance: admin.date_naissance,
              };
              break;

            case "entreprise":
                const [entreprise] = await Auth.getEntrepriseByUserId(user.id);
                console.log(entreprise)
                roleData = {
                    entreprise: entreprise.nom_entreprise,
                };
                break;
        }


        // Return session data
        res.json({
            message: 'Valid session',
            data: {
                email: user.email,
                role: user.role,
                ...roleData
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Session expired or invalid. Please login again.' });
    }
};


const logout = async (req, res) => {
    console.log('Hello')
    return res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
    }).json({ message: 'Logout successfull', })
}


const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const { email } = req.query;

  try {
    if (!email || !otp) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Get user
    const [user] = await Auth.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.email_verified){
      return res.status(400).json({ error: "Email is already verified" });
    }

    // Check OTP expiration (15 minutes)
    const otpSentAt = new Date(user.otpSentAt);
    const now = new Date();


    const diffInMinutes = (now - otpSentAt) / (1000 * 60);

    if (diffInMinutes > 15) {
      return res.status(401).json({ error: "OTP expired" });
    }

    // Compare OTP
    const isMatch = await bcrypt.compare(otp, user.otpCode);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect OTP" });
    }

    // Mark email as verified & cleanup
    await Auth.verifyEmail(user.id)
    await Auth.clearOtp(user.id)
    return res.status(200).json({ message: "Email verified successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const resendOtp = async (req , res)=>{
    const { email } = req.body
    try {
        if (!email) {
          return res.status(400).json({ error: "All fields are required" });
        }

        const [user] = await Auth.getUserByEmail(email);
        if (!user) {
          return res.status(401).json({ error: "User Not found" });
        }


        // Send verification email
        const code = generateValidationCode();

        const hashedCode = await bcrypt.hash(code, 10);
        await Auth.saveVerificationCode(user.id , hashedCode)
        await sendVerificationEmail(email , code); 
        return res.json({message : 'Email sent successfully!'})
    } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export { login , logout , register , verifySession , verifyEmail , resendOtp}