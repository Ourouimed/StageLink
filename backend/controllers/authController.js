import Auth from "../models/auth.js"
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from "uuid" 
import { sendVerificationEmail } from "../lib/send-email.js"
import jwt from 'jsonwebtoken'
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
    await sendVerificationEmail(userId, email);

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


const verfifyEmail = async (req, res) => {
    const { id } = req.query
    try {
        if (!id) {
            return res.status(400).json({ error: 'No id provided' })
        }

        // Check user Existance
        const [user] = await Auth.getUserById(id)
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        await Auth.verifyEmail(id)
        return res.status(201).json({ message: 'Email verified successfully' })
    }



    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }


}

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

            case "entreprise":
                const [entreprise] = await Auth.getEntrepriseByUserId(user.id);
                roleData = {
                    entreprise: entreprise.nom,
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
    return res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
    }).json({ message: 'Logout successfull', })
}


export { login , logout , register , verfifyEmail , verifySession}