import { usePopup } from "@/hooks/usePopup";
import { Button } from "../ui/Button";
import { useToast } from "@/hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "@/store/features/admin/adminSlice";

export default function  BlockUnblockUserPopup ({nom , blocked , id}){
    const { closePopup } = usePopup()
    const toast = useToast()
    const { isLoading } = useSelector(state => state.admin)
    const dispatch = useDispatch()

    const handleChangeBlockStatus = async ()=>{
        try {
            await dispatch(changeStatus({id , blocked})).unwrap()
            toast.success('User status changed')
            closePopup()
        }
        catch (err){
            toast.error(err)
        }
    }
    return <>
       <h4 className="mb-4">
         Are you sure you want to {blocked ? 'Unblock' : 'Block'} <span className="font-semibold">{nom}</span>
       </h4>

       <div className="flex items-center gap-1 justify-end">
            <Button onClick={closePopup} size="sm">
                Cancel 
            </Button>

            <Button className={isLoading && 'opacity-70'} variant="error" size="sm" onClick={handleChangeBlockStatus} disabled={isLoading}>
                Confirm
            </Button>
       </div>
    </>
}