import { usePopup } from "@/hooks/usePopup";
import { Button } from "../ui/Button";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/useToast";
import { deleteStage } from "@/store/features/offre-stage/offreStageSlice";

export default function DeleteStagePopup ({id , titre}){
    const { closePopup } = usePopup()
    const dispatch = useDispatch()
    const toast = useToast()
    const { isLoading } = useSelector(state => state.stage)


    const handleDeleteStage = async ()=>{
        try {
            await dispatch(deleteStage(id)).unwrap()
            toast.success('Offre supprimee avec succes')
            closePopup()
        }
        catch (err){
            toast.error(err)
        }
    }
    return <>
       <h4 className="mb-4">
         Are you sure you want to delete <span className="font-semibold">{titre}</span>
       </h4>

       <div className="flex items-center gap-1 justify-end">
            <Button onClick={closePopup} size="sm">
                Cancel 
            </Button>

            <Button className={isLoading && 'opacity-70'} variant="error" size="sm" onClick={handleDeleteStage} disabled={isLoading}>
                {isLoading ? 'Supprission en cours...' : "Supprimer l'offre"} <Trash2 size={14}/>
            </Button>
       </div>
    </>
}