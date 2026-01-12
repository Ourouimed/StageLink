import { Mail } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/useToast";
import { addEncadrant } from "@/store/features/entreprise/entrepriseSlice";
import { usePopup } from "@/hooks/usePopup";

export default function AddEncadrantPopup (){
    const [email , setEmail] = useState('')
    const { isLoading } = useSelector(state => state.entreprise)
    const dispatch = useDispatch()
    const toast = useToast()
    const { closePopup } = usePopup()

    const handleSencInvitation = async ()=>{
        if (!email.trim()) return null
        try {
            await dispatch(addEncadrant(email)).unwrap()
            toast.success('Invitaion envoyee avec success')
            closePopup()
        }
        catch (err){
            toast.error(err)
        }
    }
    return <div className="space-y-3">
        <p>Veuillez entrer email d'un encadrant</p>
        <Input value={email} placeholder='example@email.com' onChange={e=>{
            setEmail(e.target.value) 
        }}/>

        <div className="flex justify-end">
            <Button
                onClick={handleSencInvitation} 
                variant="main" size="sm" disabled={!email.trim() || isLoading} className={!email.trim() || isLoading && 'opacity-70'}>
                {isLoading ? 'Envoi en cours...' : 'Envoyez invitation'} <Mail size={14}/>
            </Button>
        </div>
    </div>
}