'use client';
import { useState } from "react";
import { ChevronLeft, ChevronRight, Home, Trophy, Earth, ChartLine, UserRound } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      <div
        className={`h-screen flex flex-col border-r border-divider ${
          isCollapsed ? "w-16" : "w-64"
        } transition-all duration-400`}
      >
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <nav className="flex flex-col space-y-1 p-4">
            <SidebarLink icon={<Home size={20} />} label="Home" href="/" isCollapsed={isCollapsed} />
            <SidebarLink icon={<Earth size={20} />} label="Communities" href="/communities" isCollapsed={isCollapsed} />
            <SidebarLink icon={<ChartLine size={20} />} label="Posts" href="/post" isCollapsed={isCollapsed} />
            <SidebarLink icon={<Trophy size={20} />} label="Leaderboard" href="/leaderboard" isCollapsed={isCollapsed} />
          </nav>

          {/* Communities Section */}
          <div className="p-4">
            <h2 className={`text-sm font-semibold text-default-500 mb-2 ${isCollapsed && "hidden"}`}>
              Communities
            </h2>
            <ul className="space-y-1">
              {/* Replace with your communities data */}
              <SidebarLink icon={<UserRound size={20} />} label="Community 1" href="/community/1" isCollapsed={isCollapsed} />
              <SidebarLink icon={<UserRound size={20} />} label="Community 2" href="/community/2" isCollapsed={isCollapsed} />
            </ul>
          </div>
        </div>
      </div>

      {/* Collapse Button */}
      <div className="relative h-screen flex py-8">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-12 w-6 flex items-center justify-center text-default-500 hover:text-foreground border border-divider rounded-r"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
    </div>
  );
}

export function SidebarLink({
  icon,
  label,
  href,
  isCollapsed,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  isCollapsed: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href && 
    label !== "Create a community" && 
    label !== "Join a community";

  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center space-x-4 p-2 rounded-md hover:bg-default-100",
        isActive ? "bg-default-100" : ""
      )}
    >
      <span className={clsx("text-default-500", isActive)}>{icon}</span>
      {!isCollapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}
