import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import SearchForm from "@/components/Header/SearchForm";
import React, { useState } from "react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {

  const [activeTab, setActiveTab] = useState("medical-records");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
      <div className="flex flex-grow items-center justify-between px-4 pt-2 shadow-2 md:px-5 2xl:px-10">
        <div className="flex items-center gap-2 sm:gap-4 ">

          <Link className="block flex-shrink-0 " href="/">
            <h1 className="mb-0.5 text-heading-5 font-bold text-green-600 dark:text-white">
              Health Service
            </h1>
          </Link>
        </div>
        <div className="flex space-x-6">
          {/* Home Tab */}
          <div
            onClick={() => handleTabClick("medical-records")}
            className={`cursor-pointer py-2 px-4 text-sm font-medium ${activeTab === "medical-records"
              ? "border-b-2 border-green-600 text-green-600"
              : "hover:border-b-2 hover:border-gray-400 hover:text-gray-300"
              }`}
          >
            เวชทะเบียน
          </div>
          <div
            onClick={() => handleTabClick("receiving-service")}
            className={`cursor-pointer pt-2 px-4 text-sm font-medium ${activeTab === "receiving-service"
              ? "border-b-2 border-green-600 text-green-600"
              : "hover:border-b-2 hover:border-gray-400 hover:text-gray-300"
              }`}
          >
            การรับบริการ
          </div>
          <div
            onClick={() => handleTabClick("withdraw-medicine")}
            className={`cursor-pointer py-2 px-4 text-sm font-medium ${activeTab === "withdraw-medicine"
              ? "border-b-2 border-green-600 text-green-600"
              : "hover:border-b-2 hover:border-gray-400 hover:text-gray-300"
              }`}
          >
            เบิกสินค้า
          </div>
          <div className="relative">
            <div
              onClick={() => handleTabClick("report")}
              className={`cursor-pointer py-2 px-4 text-sm font-medium ${activeTab === "report"
                ? "border-b-2 border-green-600 text-green-600"
                : "hover:border-b-2 hover:border-gray-400 hover:text-gray-300"
                }`}
            >
              รายงาน
            </div>
            {activeTab === "report" && (
              <div className="absolute left-0 mt-2 bg-gray-700 text-white rounded-md w-40">
                <Link href="/report/our-team">
                  <a className="block py-2 px-4 hover:bg-gray-600">Our Team</a>
                </Link>
                <Link href="/report/contact">
                  <a className="block py-2 px-4 hover:bg-gray-600">Contact</a>
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <div
              onClick={() => handleTabClick("basedata")}
              className={`cursor-pointer py-2 px-4 text-sm font-medium ${activeTab === "basedata"
                ? "border-b-2 border-green-600 text-green-600"
                : "hover:border-b-2 hover:border-gray-400 hover:text-gray-300"
                }`}
            >
              ฐานข้อมูล
            </div>
            {activeTab === "basedata" && (
              <div className="absolute left-0 mt-2 bg-white text-gray-600 rounded-md w-40 border-gray-5">
                <Link href="/basedata?keyword=faculty" className="block py-2 px-4 hover:bg-green-500 hover:text-white">คณะ
                </Link>
                {/* <Link href="/basedata/development"> */}
                <a className="block py-2 px-4 hover:bg-green-500 hover:text-white">หน่วยงาน</a>
                {/* </Link> */}
                <Link href={{ pathname: "basedata", query: { keyword: "chronicDisease" } }} className="block py-2 px-4 hover:bg-green-500 hover:text-white">โรคประจำตัว
                </Link>
                <hr className="h-px my-0 bg-gray-200 border-0 dark:bg-gray-700" />
                {/* <Link href="/basedata/development"> */}
                <a className="block py-2 px-4 hover:bg-green-500 hover:text-white">ผู้ใช้งาน</a>
                {/* </Link> */}
                {/* <Link href="/basedata/development"> */}
                <a className="block py-2 px-4 hover:bg-green-500 hover:text-white">ผู้ให้การรักษา</a>
                {/* </Link> */}
                {/* <Link href="/basedata/development"> */}
                <a className="block py-2 px-4 hover:bg-green-500 hover:text-white">การวินิจฉัย</a>
                {/* </Link> */}
                {/* <Link href="/basedata/development"> */}
                <a className="block py-2 px-4 hover:bg-green-500 hover:text-white">หัตถการ</a>
                {/* </Link> */}
                {/* <Link href="/basedata/development"> */}
                <a className="block py-2 px-4 hover:bg-green-500 hover:text-white">สถานพยาบาล</a>
                {/* </Link> */}
                <hr className="h-px my-0 bg-gray-200 border-0 dark:bg-gray-700" />
                {/* <Link href="/basedata/development"> */}
                <a className="block py-2 px-4 hover:bg-green-500 hover:text-white">คลังย่อย</a>
                {/* </Link> */}
                <Link href="/basedata/drugs" className="block py-2 px-4 hover:bg-green-500 hover:text-white">ยา
                </Link>
                {/* <Link href="/basedata/development"> */}
                <a className="block py-2 px-4 hover:bg-green-500 hover:text-white">เวชภัณฑ์</a>
                {/* </Link> */}
                {/* <Link href="/basedata/development"> */}
                <a className="block py-2 px-4 hover:bg-green-500 hover:text-white">วิธีใช้</a>
                {/* </Link> */}
              </div>
            )}
          </div>
          <div
            onClick={() => handleTabClick("contact")}
            className={`cursor-pointer py-2 px-4 text-sm font-medium ${activeTab === "contact"
              ? "border-b-2 border-green-600 text-green-600"
              : "hover:border-b-2 hover:border-gray-400 hover:text-gray-300"
              }`}
          >
            ติดต่อเรา
          </div>
        </div>

        <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Search Form --> */}
            {/* <SearchForm /> */}
            {/* <!-- Search Form --> */}

            {/* <!-- Dark Mode Toggle --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggle --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
