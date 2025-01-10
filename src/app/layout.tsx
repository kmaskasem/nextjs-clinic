"use client";
import "jsvectormap/dist/jsvectormap.css";

import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  <div className=""></div>

  useEffect(() => {
    setTimeout(() => setLoading(false), 250);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {loading ?
          <>
            <div className="flex items-center justify-center h-screen">
              <Loader size={16} />
            </div>
          </>
          : children}
      </body>
    </html>
  );
}
