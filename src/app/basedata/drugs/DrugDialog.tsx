"use client"
import { Drug } from "@prisma/client";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Textarea } from '@headlessui/react'
import { useState, useEffect } from 'react'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { drugSchema, type DrugSchema } from "../../../../lib/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type DrugDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    drug: Drug | null;
};

const DrugDialog = ({ isOpen, onClose, drug }: DrugDialogProps) => {
    const [errorMessage, setErrorMessage] = useState("");
    const form = useForm<DrugSchema>({
        resolver: zodResolver(drugSchema),
        defaultValues: drug || {
            id: "",
            code: "",
            catagory: "",
            name: "",
            price: 0,
            unit: "",
            unitf: 1,
            prices: 0,
            units: "",
            description: "",
        },
    });

    useEffect(() => {
        form.reset(drug || {
            id: "",
            code: "",
            catagory: "",
            name: "",
            price: 0,
            unit: "",
            unitf: 1,
            prices: 0,
            units: "",
            description: "",
        });
    }, [drug, form]);

    const handleSubmit = async (data: DrugSchema) => {
        try {
            const transformedData = {
                ...data,
                price: Number(data.price),
                unitf: Number(data.unitf),
                prices: Number(data.prices),
            };
    
            let response;
            if (drug) {
                // Update drug
                response = await fetch("/api/drugs", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...data, id: drug.id }),
                });
            } else {
                // Create new drug
                response = await fetch("/api/drugs", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
            }

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || "Failed to save drug data");
            }

            form.reset();
            setErrorMessage("");
            onClose();
            window.location.reload() 
        } catch (error) {
            console.error(error);
            setErrorMessage(
                error instanceof Error ? error.message : "An unexpected error occurred"
            );
        } 
        // finally {
            
        // }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                className="fixed inset-0 bg-gray-500/75 transition-opacity"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:w-full sm:max-w-4xl">
                        <div className="bg-green-600 px-4 py-3 sm:flex sm:flex-row sm:px-6">
                            <DialogTitle as="h2" className="font-semibold text-white">
                                {drug ? "แก้ไขข้อมูลยา" : "เพิ่มข้อมูลยา"}
                            </DialogTitle>
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-sm mb-4">
                                {errorMessage}
                            </div>
                        )}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">

                                        <div className="grid grid-cols-12 gap-4 mb-4">
                                            <FormField
                                                control={form.control}
                                                name="code"
                                                render={({ field }) => (
                                                    <FormItem className="col-span-4">
                                                        <FormLabel>รหัส</FormLabel>
                                                        <FormControl>
                                                            <input
                                                                {...field}
                                                                className="border border-gray-300 p-2 w-full rounded"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem className="col-span-8">
                                                        <FormLabel>รายการ</FormLabel>
                                                        <FormControl>
                                                            <input
                                                                {...field}
                                                                className="border border-gray-300 p-2 w-full rounded"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem className="mb-4">
                                                    <FormLabel>วิธีใช้</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            className="border border-gray-300 p-2 w-full rounded"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="border rounded p-4">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-[#F7F9FC]">
                                                        <th className="border-b border-r px-2 py-2">เบิก</th>
                                                        <th className="border-b  px-2 py-2">จ่าย</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="border-t border-r px-2 py-2">
                                                            <div className="flex items-center space-x-2">
                                                                <div>
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="units"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>หน่วยนับ</FormLabel>
                                                                                <FormControl>
                                                                                    <input
                                                                                        {...field}
                                                                                        className="border border-gray-300 rounded p-2 w-full"
                                                                                    />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="prices"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>ราคา</FormLabel>
                                                                                <FormControl>
                                                                                    <div className="flex items-center border border-gray-300 rounded-md p-2">

                                                                                        <input
                                                                                            {...field}
                                                                                            type="number"
                                                                                            className="flex-1 border-none focus:outline-none"
                                                                                        />
                                                                                        <span className="ml-2 text-gray-500">บาท</span>
                                                                                    </div>

                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="unitf"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>แบ่งจ่าย</FormLabel>
                                                                                <FormControl>
                                                                                    <input
                                                                                        {...field}
                                                                                        type="number"
                                                                                        className="border border-gray-300 rounded p-2 w-full"
                                                                                    />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>

                                                        </td>
                                                        <td className="border-t px-2 py-2">
                                                            <div className="flex items-center space-x-2">
                                                                <div>
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="unit"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>หน่วยนับ</FormLabel>
                                                                                <FormControl>
                                                                                    <input
                                                                                        {...field}
                                                                                        className="border border-gray-300 rounded p-2 w-full"
                                                                                    />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="price"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>ราคา</FormLabel>
                                                                                <FormControl>
                                                                                    <div className="flex items-center border border-gray-300 rounded-md p-2">

                                                                                        <input
                                                                                            {...field}
                                                                                            type="number"
                                                                                            className="flex-1 border-none focus:outline-none"
                                                                                        />
                                                                                        <span className="ml-2 text-gray-500">บาท</span>
                                                                                    </div>

                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <hr />
                                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                                                เพิ่มหน่วย
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                    >
                                        บันทึก
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        ยกเลิก
                                    </button>
                                </div>
                            </form>
                        </Form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export default DrugDialog;