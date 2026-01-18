'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { usePopup } from "@/hooks/usePopup";
import { useToast } from "@/hooks/useToast";
import { getUsers } from "@/store/features/admin/adminSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit2, Trash2, MoreVertical } from "lucide-react"; // Recommended for icons
import { Button } from "@/components/ui/Button";

export default function UsersPage() {
    const dispatch = useDispatch();
    const toast = useToast();
    const { openPopup } = usePopup();
    // Added loading state from Redux
    const { users, isLoading } = useSelector(state => state.admin);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
                    <p className="text-gray-500 mt-1">Gérez les accès et les rôles des membres</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Nom / Email</th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Vérifié</th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {users && users.length > 0 ? (
                                users.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50/80 transition-all">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">{u.nom}</span>
                                                <span className="text-xs text-gray-500">{u.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge text={u.role}/>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge 
                                                variant={u.blocked ? "error" : "success"}
                                                text={u.blocked ? 'Bloqué' : 'Actif'}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            {u.email_verified ? (
                                                <span className="text-green-600 text-xs font-semibold">Oui</span>
                                            ) : (
                                                <span className="text-gray-400 text-xs">Non</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm"  
                                                        outline 
                                                        variant={u.blocked ? "success" : 'error'}
                                                        onClick= {()=> openPopup({title : `${u.blocked ? 'Unblock' : 'Block'} user` , component : 'BlockUnblockUserPopup' , props : {
                                                            nom : u.nom , 
                                                            id : u.id ,
                                                            blocked : u.blocked
                                                        }})}
                                                >
                                                    {u.blocked ? 'Unblock' : 'Block'}
                                                </Button>
                                                
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                        {isLoading ? "Chargement..." : "Aucun utilisateur trouvé"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}