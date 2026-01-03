"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/hooks/useToast";
import { resendOtp, verifyEmail } from "@/store/features/auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function VerifyEmail() {
  const email = useSearchParams().get('email');
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const toast = useToast();
  const router = useRouter();
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);


  const [timer, setTimer] = useState(60); // 60s countdown for resend
  const [canResend, setCanResend] = useState(false);


  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Check if all fields are filled
  const isOtpComplete = otp.every(digit => digit !== "");

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6); // Get first 6 chars
    if (!/^\d+$/.test(pasteData)) return; // Only allow numbers

    const newOtp = [...otp];
    pasteData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus the last filled input or the next empty one
    const lastIndex = Math.min(pasteData.length, 5);
    inputsRef.current[lastIndex].focus();
  };

  const handleVerify = async () => {
    const otpTosend = otp.join('');
    if (otpTosend.length < 6) {
      toast.error('Please enter the full 6-digit code');
      return;
    }
    
    try {
      await dispatch(verifyEmail({ email, otp: otpTosend })).unwrap();
      toast.success('Email verified successfully');
      router.push('/login');
    } catch (err) {
      toast.error(err || "Verification failed");
    }
  };

  const handleResend = async () => {
    try {
      await dispatch(resendOtp(email)).unwrap();
      toast.success('Un nouveau code a été envoyé.');
      setTimer(60);
      setCanResend(false);
    } 
    catch (err) {
      toast.error(err);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
        <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-center">
              Vérifiez votre e-mail
            </h2>

            <p className="text-sm text-slate-500">
                Nous avons envoyé un code de vérification à <br/>
                <span className="font-medium text-slate-700">{email || "votre adresse e-mail"}</span>
            </p>

        </div>
        

        <div className="flex justify-center gap-3" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric" 
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg font-semibold"
            />
          ))}
        </div>

        <Button
          disabled={isLoading || !isOtpComplete}
          onClick={handleVerify}
          variant="main"
          className={`justify-center w-full ${(isLoading || !isOtpComplete) && "opacity-50 cursor-not-allowed"}`}
        >
          {isLoading ? 'Vérification...' : 'Vérifier le code'}
        </Button>


        <div className="text-center">
            <p className="text-sm text-slate-600">
              Vous n'avez pas reçu le code ?
            </p>
            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`mt-1 text-sm font-bold underline transition-colors ${
                canResend ? "text-blue-600 hover:text-blue-800" : "text-slate-400 cursor-not-allowed"
              }`}
            >
              {canResend ? "Renvoyer un nouveau code" : `Renvoyer dans ${timer}s`}
            </button>
        </div>

      </div>
    </section>
  );
}