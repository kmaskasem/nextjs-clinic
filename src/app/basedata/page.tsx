"use client";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useState } from "react";
import { FaPen, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { useSearchParams } from "next/navigation";

const dataSets: { [key: string]: any[] } = {
    chronicDisease: [
        { code: 1, name: "ไข้หวัดใหญ่" },
        { code: 2, name: "ไข้เลือดออก" },
    ],
    faculty: [
        { code: 1001, name: "กองการเจ้าหน้าที่" },
        { code: 1002, name: "กองกิจการนักศึกษา" },
    ],
};

const GenericDialog = ({ isOpen, closeModal, title, onSubmit }: any) => {
    const [formData, setFormData] = useState({ code: "", name: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
        setFormData({ code: "", name: "" });
        closeModal();
    };

    return (
        <Transition appear show={isOpen} as="div">
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <div className="fixed inset-0 bg-black bg-opacity-25" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl">
                            <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
                            <div className="mt-4">
                                <form>
                                    <div>
                                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                            Code
                                        </label>
                                        <input
                                            type="text"
                                            name="code"
                                            id="code"
                                            value={formData.code}
                                            onChange={handleChange}
                                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    onClick={closeModal}
                                    className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                                >
                                    Save
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};


const ManagePage = () => {
    const searchParams = useSearchParams();
    const keyword = searchParams.get("keyword") || "faculty";
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [data, setData] = useState(dataSets[keyword]);

    const handleAdd = (newItem: { code: string; name: string }) => {
        setData((prev) => [...prev, { ...newItem, code: Number(newItem.code) }]);
    };

    return (
        <DefaultLayout>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full items-center justify-between">
                    <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
                        {keyword}
                    </h2>
                    <button
                        className="flex items-center justify-between rounded-[7px] bg-green-600 px-4 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"

                        onClick={() => setIsDialogOpen(true)}
                    >
                        <FaPlus className="me-2" />
                        เพิ่ม{keyword}
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-10">

                <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
                    <div className="flex w-full items-center justify-between">
                        <h5 className="text-body-2lg text-dark dark:text-white">
                            ทั้งหมด 80 รายการ
                        </h5>
                        <form action="#" method="POST" className="flex items-center pb-2">
                            <div className="relative w-full max-w-[300px]">
                                <button className="absolute left-4 top-1/2 -translate-y-1/2 text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                                    <svg
                                        className="fill-current"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_1791_1693)">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M8.625 2.0625C5.00063 2.0625 2.0625 5.00063 2.0625 8.625C2.0625 12.2494 5.00063 15.1875 8.625 15.1875C12.2494 15.1875 15.1875 12.2494 15.1875 8.625C15.1875 5.00063 12.2494 2.0625 8.625 2.0625ZM0.9375 8.625C0.9375 4.37931 4.37931 0.9375 8.625 0.9375C12.8707 0.9375 16.3125 4.37931 16.3125 8.625C16.3125 10.5454 15.6083 12.3013 14.4441 13.6487L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L13.6487 14.4441C12.3013 15.6083 10.5454 16.3125 8.625 16.3125C4.37931 16.3125 0.9375 12.8707 0.9375 8.625Z"
                                                fill=""
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1791_1693">
                                                <rect width="18" height="18" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>

                                <input
                                    type="text"
                                    placeholder="ค้นหา"
                                    className="w-full rounded-full border border-stroke bg-gray-2 py-2 pl-13.5 pr-5 text-dark focus:border-primary focus:outline-none dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus:border-primary xl:w-[300px]"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                                    <th className="w-[5%] min-w-[25px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                                        ลำดับ
                                    </th>
                                    <th className="w-[10%] min-w-[25px] px-4 py-4 font-medium text-dark dark:text-white">
                                        รหัส
                                    </th>
                                    <th className="w-[75%] min-w-[200px] px-4 py-4 font-medium text-dark dark:text-white">
                                        รายการ
                                    </th>
                                    <th className="w-[10%] min-w-[100px] px-4 py-4 font-medium text-dark dark:text-white">
                                        จัดการ
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td
                                            className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === item.length - 1 ? "border-b-0" : "border-b"}`}
                                        >
                                            <p className="mt-[3px] text-body-sm font-medium">
                                                {index + 1}
                                            </p>
                                        </td>
                                        <td
                                            className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === item.length - 1 ? "border-b-0" : "border-b"}`}
                                        >
                                            <p className="text-body-sm font-medium text-dark dark:text-white">
                                                {item.code}
                                            </p>
                                        </td>
                                        <td
                                            className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === item.length - 1 ? "border-b-0" : "border-b"}`}
                                        >
                                            <p className="text-dark dark:text-white">
                                                {item.name}
                                            </p>
                                        </td>
                                        <td
                                            className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === item.length - 1 ? "border-b-0" : "border-b"}`}
                                        >
                                            <div className="flex items-center justify-around space-x-3.5">
                                                <button className="hover:text-primary">
                                                    <FaPen />
                                                </button>
                                                <button className="hover:text-red-500">
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <GenericDialog
                isOpen={isDialogOpen}
                closeModal={() => setIsDialogOpen(false)}
                title={`Add New ${keyword}`}
                onSubmit={handleAdd}
            />
        </DefaultLayout>
    );
};

export default ManagePage;
