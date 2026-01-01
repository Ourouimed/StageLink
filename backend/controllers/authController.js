const Auth = require("../models/auth");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { sendVerificationEmail } = require("../lib/send-email");

exports.register = async (req, res) => {
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
