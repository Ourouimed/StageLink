'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";



export default function OffresDeStages (){

    
    return <>
        <DashboardLayout>
            <div className="flex justify-between items-center">
                <h4 className="text-2xl font-semibold">
                    Offres de stages
                </h4>
                <Button variant="main" size='sm'>
                    Ajouter une offre <Plus/>
                </Button>
            </div>
        </DashboardLayout>
    </>
}