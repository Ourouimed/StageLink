import { usePopup } from "@/hooks/usePopup";
import { Button } from "../ui/Button";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/useToast";
import { deleteStage } from "@/store/features/offre-stage/offreStageSlice";
import { declineCandidature } from "@/store/features/entreprise/entrepriseSlice";

export default function DeclineCandidaturePopup ({id}){
    const { closePopup } = usePopup()
    const dispatch = useDispatch()
    const toast = useToast()
    const { isLoading } = useSelector(state => state.stage)


    const handleDeclineCandidature = async ()=>{
        try {
            await dispatch(declineCandidature(id)).unwrap()
            toast.success('Candidature refusee avec succes')
            closePopup()
        }
        catch (err){
            toast.error(err)
        }
    }
    return <>
       <h4 className="mb-4">
         Are you sure you want to decline candidature <span className="font-semibold">{id}</span>
       </h4>

       <div className="flex items-center gap-1 justify-end">
            <Button onClick={closePopup} size="sm">
                Cancel 
            </Button>

            <Button className={isLoading && 'opacity-70'} variant="error" size="sm" onClick={handleDeclineCandidature} disabled={isLoading}>
                {isLoading ? 'Refus en cours...' : "Reffuser la candidature"} <Trash2 size={14}/>
            </Button>
       </div>
    </>
}