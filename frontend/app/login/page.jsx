"use client"
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
        
        {/* Logo / Title */}
        <div className="text-center space-y-1">
          <h3 className="text-3xl font-bold">
            Stage<span className="text-main">Link</span>
          </h3>
          <p className="text-sm text-gray-500">
            Connectez-vous à votre compte
          </p>
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
            value={loginForm.email}
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
            value={loginForm.password}
          />
        </div>

        {/* Options */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-main" />
            Se souvenir de moi
          </label>

          <a href="/forgot-pass" className="text-main hover:underline">
            Mot de passe oublié ?
          </a>
        </div>

        <Button
          variant="main"
          className="w-full justify-center"
        >
          Se connecter
        </Button>
        <p className="text-center text-sm text-gray-500">
          Vous n’avez pas de compte ?{" "}
          <a href="/register" className="text-main font-medium hover:underline">
            S’inscrire
          </a>
        </p>
      </div>
    </section>
  );
}
