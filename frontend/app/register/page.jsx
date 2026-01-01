"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { registerUser } from "@/store/features/auth/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const ROLES = ["etudiant", "encadrant", "entreprise", "admin"];

export default function Register() {
  const [role, setRole] = useState("etudiant");


  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.auth)

  if (isLoading) console.log(isLoading)
  

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    entreprise: "",
    email: "",
    password: "",
    confirmPassword: "", 
    date_naissance : ""
  });

  const [validationErrors, setValidationErrors] = useState({});

  /* ================= HANDLERS ================= */

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.id]: target.value }));
  };

  const handleRoleChange = (value) => {
    setRole(value);
    setValidationErrors({});

    setForm((prev) => ({
      ...prev,
      prenom: "",
      date_naissance : "",
      nom: "",
      entreprise: "",
    }));
  };

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    const errors = {};

    // Role-based validation
    if (role === "entreprise") {
      if (!form.entreprise.trim()) {
        errors.entreprise = "Le nom de l’entreprise est requis";
      }
    } else {
      if (!form.prenom.trim()) {
        errors.prenom = "Le prénom est requis";
      }
      if (!form.nom.trim()) {
        errors.nom = "Le nom est requis";
      }
      if (!form.date_naissance.trim()) {
        errors.date_naissance = "La date de naissance est requis";
      }
    }

    // Email
    if (!form.email.trim()) {
      errors.email = "Email requis";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errors.email = "Email invalide";
    }

    // Password
    if (!form.password.trim()) {
      errors.password = "Mot de passe requis";
    } else if (form.password.length < 6 || form.password.length > 15) {
      errors.password = "Le mot de passe doit contenir 6 à 15 caractères";
    }

    // Confirm password
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ================= SUBMIT ================= */

  const handleRegister = () => {
    if (!validateForm()) return;

    const payload = {
      role,
      email: form.email,
      password: form.password,
      ...(role === "entreprise"
        ? { entreprise: form.entreprise }
        : { prenom: form.prenom, nom: form.nom , date_naissance : form.date_naissance}),
    };
    dispatch(registerUser(payload))
  };

  const roleOptions = ROLES.map((r) => ({ value: r, label: r }));

  /* ================= JSX ================= */

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div
        className="w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-sm p-6 space-y-5"
      >
        {/* Header */}
        <div className="text-center">
          <h3 className="text-3xl font-bold">
            Stage<span className="text-main">Link</span>
          </h3>
          <p className="text-sm text-gray-500">Créez votre compte</p>
        </div>

        {/* Role */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Rôle</label>
          <Select options={roleOptions} value={role} onChange={handleRoleChange} />
          {validationErrors.role && (
            <p className="text-xs text-red-500">{validationErrors.role}</p>
          )}
        </div>

        {/* Conditional fields */}
        {role === "entreprise" ? (
          <div className="space-y-2">
            <label htmlFor="entreprise" className="text-sm font-medium">
              Nom de l’entreprise
            </label>
            <Input
              id="entreprise"
              value={form.entreprise}
              onChange={handleChange}
            />
            {validationErrors.entreprise && (
              <p className="text-xs text-red-500">
                {validationErrors.entreprise}
              </p>
            )}
          </div>
        ) : <>
          <div className="flex gap-4">
            <div className="space-y-2 w-full">
              <label htmlFor="prenom" className="text-sm font-medium">
                Prénom
              </label>
              <Input id="prenom" value={form.prenom} onChange={handleChange} />
              {validationErrors.prenom && (
                <p className="text-xs text-red-500">
                  {validationErrors.prenom}
                </p>
              )}
            </div>

            <div className="space-y-2 w-full">
              <label htmlFor="nom" className="text-sm font-medium">
                Nom
              </label>
              <Input id="nom" value={form.nom} onChange={handleChange} />
              {validationErrors.nom && (
                <p className="text-xs text-red-500">{validationErrors.nom}</p>
              )}
            </div>
          </div>

          {/* Date naissance*/}
           <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Date de naissance
          </label>
          <Input id="date_naissance" type='date' value={form.date_naissance} onChange={handleChange} />
          {validationErrors.date_naissance && (
            <p className="text-xs text-red-500">{validationErrors.date_naissance}</p>
          )}
        </div>
        </>}

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" value={form.email} onChange={handleChange} />
          {validationErrors.email && (
            <p className="text-xs text-red-500">{validationErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Mot de passe
          </label>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          {validationErrors.password && (
            <p className="text-xs text-red-500">
              {validationErrors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirmer le mot de passe
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {validationErrors.confirmPassword && (
            <p className="text-xs text-red-500">
              {validationErrors.confirmPassword}
            </p>
          )}
        </div>

        <Button onClick={handleRegister} variant="main" className={`w-full justify-center ${isLoading && 'opacity-30 cursor-not-allowed'}`} disabled={isLoading}>
          {isLoading ? 'Inscription en cours' : 'S’inscrire'}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Déjà un compte ?{" "}
          <a href="/login" className="text-main font-medium hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </section>
  );
}
