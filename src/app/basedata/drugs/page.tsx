"use client"
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Drug } from "@prisma/client";
import DrugTable from "./DrugTable";
import DrugDialog from "./DrugDialog";
import { FaPen, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useState } from 'react'

const DrugPage = () => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

    const openCreateDialog = () => {
        setSelectedDrug(null);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    return (
        <DefaultLayout>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full items-center justify-between">
                    <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
                        ยา
                    </h2>
                    <button
                        className="flex items-center justify-between rounded-[7px] bg-green-600 px-4 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"

                        onClick={openCreateDialog}
                    >
                        <FaPlus className="me-2" />
                        เพิ่มยา
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-10">

                <DrugTable />

            </div>
            <DrugDialog
                isOpen={dialogOpen}
                onClose={closeDialog}
                drug={selectedDrug}
            />
        </DefaultLayout >
    );
};

export default DrugPage;
