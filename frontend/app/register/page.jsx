"use client"
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function Register() {
  const [registerForm, setRegisterForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setRegisterForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">

        {/* Title */}
        <div className="text-center space-y-1">
          <h3 className="text-3xl font-bold">
            Stage<span className="text-main">Link</span>
          </h3>
          <p className="text-sm text-gray-500">
            Créez votre compte
          </p>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="fullname" className="text-sm font-medium">
            Nom complet
          </label>
          <Input
            id="fullname"
            type="text"
            placeholder="John Doe"
            onChange={handleChange}
            value={registerForm.fullname}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="johndoe@email.com"
            onChange={handleChange}
            value={registerForm.email}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Mot de passe
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
            value={registerForm.password}
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirmer le mot de passe
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
            value={registerForm.confirmPassword}
          />
        </div>

        <Button
          variant="main"
          className="w-full justify-center"
        >
          S’inscrire
        </Button>

        <p className="text-center text-sm text-gray-500">
          Vous avez déjà un compte ?{" "}
          <a href="/login" className="text-main font-medium hover:underline">
            Se connecter
          </a>
        </p>

      </div>
    </section>
  );
}
