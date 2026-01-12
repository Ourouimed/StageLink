import { usePopup } from "@/hooks/usePopup"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "../ui/Select"
import { useState } from "react"
import { Button } from "../ui/Button"
import { useToast } from "@/hooks/useToast"
import { acceptCandidature } from "@/store/features/entreprise/entrepriseSlice"

export default function AcceptCandidaturePopup ({id , encadrants = []}){
    const [selectedEncadrant , setSelectedEncadrant] = useState('')
    const { isLoading} = useSelector(state => state.entreprise)
    const dispatch = useDispatch()
    const toast = useToast()
    const { closePopup} = usePopup()
    const handleEncadrantChange = value => {
        setSelectedEncadrant(value)
    }


    const handleAcceptCandidature = async()=>{
        try {
            await dispatch(acceptCandidature({id , encadrant : selectedEncadrant})).unwrap()
            toast.success('candidature acceptee')
            closePopup()
        }
        catch(err) {
            toast.error(err)
        }
    }
    const encadrantOption = encadrants.map(e => ({value : e.id_encadrant , label : e.nom + " " + e.prenom}))
    return <div className="space-y-2">
        <Select options={encadrantOption} value={selectedEncadrant} onChange={handleEncadrantChange}/>
        <div className="flex justify-end">
            <Button variant='main' size='sm' disabled={isLoading || !selectedEncadrant} className={isLoading && 'opacity-70'}
                onClick={handleAcceptCandidature}>
               {isLoading ? 'Aceeptation en cours...' : 'Accepter candidature'}
            </Button>
        </div>
    </div>
}