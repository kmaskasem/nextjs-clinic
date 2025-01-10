import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import DrugDialog from "./DrugDialog";
import Loader from "@/components/common/Loader";
import React, { useState ,useEffect } from "react";
import { Drug } from "@prisma/client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DrugTable = () => {
    const { data: drugs, error, isLoading } = useSWR<Drug[]>("/api/drugs", fetcher);

    const [Data, setData] = useState<Drug[]>(drugs || []);
    const [filteredData, setFilteredData] = useState<Drug[]>([]);  // เปลี่ยนให้เริ่มต้นเป็นค่าว่าง
    const [searchText, setSearchText] = useState("");
    const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleEdit = (drug: Drug) => {
        setSelectedDrug(drug);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedDrug(null);
        setDialogOpen(false);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value.toLowerCase();
        setSearchText(text);
        const filtered = Data.filter(
            (item) =>
                item.name.toLowerCase().includes(text) ||
                item.code.toLowerCase().includes(text)
        );
        setFilteredData(filtered);
    };


    // Use useEffect to update filteredData when drugs or searchText changes
    useEffect(() => {
        if (drugs) {
            // Filter drugs based on the searchText
            const filtered = drugs.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchText) ||
                    item.code.toLowerCase().includes(searchText)
            );
            setFilteredData(filtered);
        }
    }, [drugs, searchText]);  // Re-run when drugs or searchText changes

    return (
        <>
            <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
                <div className="flex w-full items-center justify-between">
                    <h5 className="text-body-2lg text-dark dark:text-white">
                        ทั้งหมด {filteredData.length} รายการ
                    </h5>
                    <form action="#" method="POST" className="flex items-center pb-2">
                        <div className="relative w-full max-w-[300px]">
                            <input
                                type="text"
                                placeholder="ค้นหา"
                                className="w-full rounded-full border border-stroke bg-gray-2 py-2 pl-13.5 pr-5 text-dark focus:border-primary focus:outline-none dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus:border-primary xl:w-[300px]"
                                value={searchText}
                                onChange={handleSearch}
                            />
                        </div>
                    </form>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                                <TableHead className="min-w-[5%] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">ลำดับ</TableHead>
                                <TableHead className="min-w-[7%] px-4 py-4 font-medium text-dark dark:text-white">รหัส</TableHead>
                                <TableHead className="min-w-[20%] px-4 py-4 font-medium text-dark dark:text-white">รายการ</TableHead>
                                <TableHead className="min-w-[10%] px-4 py-4 text-right font-medium text-dark dark:text-white">
                                    <div className="flex justify-between">
                                        <span>หน่วยนับ<br />(แบ่งจ่าย)</span>
                                        <span>แบ่งจ่าย<br />(แบ่งจ่าย)</span>
                                    </div>
                                </TableHead>
                                <TableHead className="min-w-[7%] px-4 py-4 font-medium text-dark dark:text-white">ราคา<br />(เบิก)</TableHead>
                                <TableHead className="min-w-[7%] px-4 py-4 font-medium text-dark dark:text-white">หน่วยนับ<br />(จ่าย)</TableHead>
                                <TableHead className="min-w-[7%] px-4 py-4 font-medium text-dark dark:text-white">ราคา<br />(จ่าย)</TableHead>
                                <TableHead className="min-w-[31%] px-4 py-4 font-medium text-dark dark:text-white">วิธีใช้</TableHead>
                                <TableHead className="min-w-[10%] px-4 py-4 font-medium text-dark dark:text-white">จัดการ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Handle Loading State */}
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center py-10">
                                        <Loader size={6} />
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {/* Handle Error State */}
                            {error ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center py-10 text-gray-600">
                                        Error loading data. Please try again later.
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {/* Handle No Data State */}
                            {filteredData.length === 0 && !isLoading && !error ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center py-10 text-gray-600">
                                        No data yet.
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {/* Render Data */}
                            {!isLoading && !error && filteredData.length > 0 && (
                                filteredData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center text-gray-7">{index + 1}</TableCell>
                                        <TableCell>{item.code}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-between">
                                                <span>{item.units}</span>
                                                <span>({item.unitf})</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{item.prices}</TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                        <TableCell>{item.prices / item.unitf}</TableCell>
                                        <TableCell className="text-gray-600">{item.description}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-around space-x-3.5">
                                                <button className="hover:text-green" onClick={() => handleEdit(item)}>
                                                    <FaPen />
                                                </button>
                                                <button className="hover:text-red-500">
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <DrugDialog isOpen={dialogOpen} onClose={closeDialog} drug={selectedDrug} />
        </>
    );
};

export default DrugTable;
