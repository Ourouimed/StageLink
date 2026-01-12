'use client'
import { useDispatch, useSelector } from "react-redux";
import { User, BookOpen, Briefcase, Save } from "lucide-react";
import { Button } from "../ui/Button";
import { useToast } from "@/hooks/useToast";
import { addNoteEvaluation } from "@/store/features/entreprise/entrepriseSlice";
import { Input } from "../ui/Input";
import { useState } from "react";
import { addNotePedagogique } from "@/store/features/encadrant/encadrantSlice";
import { usePopup } from "@/hooks/usePopup";

export default function EditStageComp({ stage }) {
    console.log(stage)
    const { user } = useSelector((state) => state.auth);
    const { closePopup } = usePopup()
    const { isLoading: noteEvalLoading } = useSelector(state => state.entreprise);
    const { isLoading: notePedaLoaging } = useSelector(state => state.encadrant);
    
    
    const [note, setNote] = useState(
        user.role === 'entreprise' ? stage.note_evaluation : 
        user.role === 'encadrant' ? stage.note_pedagogique : 0
    );

    const toast = useToast();
    const dispatch = useDispatch();

    const handleAddNote = async () => {
        try {
            if (user.role === 'entreprise') {
                await dispatch(addNoteEvaluation({ id: stage.stage_id, note })).unwrap();
                toast.success('Note d\'évaluation attribuée');
            
            } else if (user.role === 'encadrant') {
               
                await dispatch(addNotePedagogique({ id: stage.stage_id, note })).unwrap();
                toast.success('Note pédagogique attribuée');
            }
            closePopup()
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <div className="space-y-6 p-2">
            {/* Header Info */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{stage.titre}</h3>
                    <p className="text-sm text-gray-500">{stage.type_stage}</p>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    {stage.status}
                </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} className="text-gray-400" />
                    <span><strong>Étudiant:</strong> {stage.etudiant}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase size={16} className="text-gray-400" />
                    <span><strong>Dispo:</strong> {stage.disponibilite}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen size={16} className="text-gray-400" />
                    <span><strong>Spécialité:</strong> {stage.specialite}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} className="text-gray-400" />
                    <span><strong>Encadrant:</strong> {stage.encadrant}</span>
                </div>
            </div>

            <hr className="border-gray-100" />

            <div className="space-y-4">
                {/* Dynamic Input based on Role */}
                {(user?.role === 'entreprise' || user?.role === 'encadrant') && (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">
                            {user.role === 'entreprise' ? "Note d'évaluation (Entreprise)" : "Note Pédagogique (Encadrant)"}
                        </label>
                        <Input 
                            type="number" 
                            max="20" 
                            min="0"
                            step="0.25"
                            value={note}
                            // Changed to e.target.value as standard for HTML inputs
                            onChange={(e) => setNote(e.target.value)} 
                            placeholder="Entrez la note sur 20..."
                        />
                    </div>
                )}

                {/* Score Summary */}
                <div className="bg-gray-50 p-4 rounded-xl flex justify-around border border-gray-100">
                    <div className="text-center border-r border-gray-200 pr-4 w-full">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Moyenne Finale</p>
                        <p className="text-xl font-bold text-blue-600">{stage.note_final} / 20</p>
                    </div>
                    <div className="text-center w-full">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Autre Note</p>
                        <p className="text-sm font-medium text-gray-600">
                            {user.role === 'entreprise' ? stage.note_evaluation : stage.note_pedagogique} / 20
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button 
                    variant="main" 
                    size="sm" 
                    onClick={handleAddNote}
                    disabled={noteEvalLoading || notePedaLoaging}
                    className={noteEvalLoading || notePedaLoaging && 'opacity-70'}
                >
                    {noteEvalLoading || notePedaLoaging ? "Enregistrement..." : "Enregistrer les modifications"}
                    <Save className="ml-2" size={16}/>
                </Button>
            </div>
        </div>
    );
}