"use client"
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/hooks/useToast";
import { loginUser, verifySession } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

    const [validationErrors, setValidationErrors] = useState({});


    const toast = useToast()
    const dispatch = useDispatch()
    const router = useRouter()
    const { user } = useSelector(state => state.auth)


     useEffect(() => {
      // Check session on page load
        dispatch(verifySession());
      }, [dispatch]);

     useEffect(() => {
    if (user) {
      // Redirect based on role
      if (user.role === 'etudiant') router.push('/etudiant/dashboard');
      else if (user.role === 'encadrant') router.push('/encadrant/dashboard');
      else if (user.role === 'entreprise') router.push('/entreprise/dashboard');
      else if (user.role === 'admin') router.push('/admin/dashboard');
    }
  }, [user, router]);


  const handleChange = (e) => {
    setLoginForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!loginForm.email.trim()) errors.email = "Email requis";
    else if (!/^\S+@\S+\.\S+$/.test(loginForm.email)) {
      errors.email = "Email invalide";
    }

    if (!loginForm.password.trim()) {
      errors.password = "Mot de passe requis";
    } else if (loginForm.password.length < 6 || loginForm.password.length > 15) {
      errors.password = "Le mot de passe doit contenir 6 à 15 caractères";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;



  }
  const handleLogin = async ()=>{
    if (!validateForm()) return null

    try {
      await dispatch(loginUser(loginForm)).unwrap()
      toast.success('Login successfully')
    }
    catch (err){
      toast.error(err)
    }
  }


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
            placeholder="••••••••"
            onChange={handleChange}
            value={loginForm.password}
          />
          {validationErrors.password && (
            <p className="text-xs text-red-500">{validationErrors.password}</p>
          )}
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
          onClick={handleLogin}
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
