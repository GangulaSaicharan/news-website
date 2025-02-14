"use client";

import { usePathname } from "next/navigation"; // ✅ Get current path dynamically
import { navigation } from "@/app/config/data";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
} from "@/app/ui-utils/sidebar";
import React from "react";

export default function SidebarComponent() {
  // ✅ Rename function to PascalCase
  const pathname = usePathname(); // ✅ Get current path on the client

  return (
    <Sidebar>
      {/* <SidebarHeader>Application</SidebarHeader> */}
      <SidebarBody>
        {navigation.map((item, index) => (
          <SidebarItem
            key={index}
            current={pathname === item.path} // ✅ Dynamically check active route
            href={item.path}
          >
            {item.title}
          </SidebarItem>
        ))}
      </SidebarBody>
      <SidebarFooter />
    </Sidebar>
  );
}
