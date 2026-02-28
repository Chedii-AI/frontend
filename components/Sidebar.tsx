"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Scan,
    ChevronLeft,
    ChevronRight,
    Leaf,
} from "lucide-react";
import { useState } from "react";

const sidebarLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/analyze", label: "Analyze", icon: Scan },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "hidden lg:flex flex-col border-r border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300",
                collapsed ? "w-16" : "w-64"
            )}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/40">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-sm">Navigation</span>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted transition-colors"
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-3 space-y-1">
                {sidebarLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                            pathname === link.href
                                ? "bg-primary/10 text-primary shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted",
                            collapsed && "justify-center px-2"
                        )}
                        title={collapsed ? link.label : undefined}
                    >
                        <link.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && <span>{link.label}</span>}
                    </Link>
                ))}
            </nav>

            {/* Sidebar Footer */}
            {!collapsed && (
                <div className="p-4 border-t border-border/40">
                    <div className="rounded-xl bg-primary/5 p-3">
                        <p className="text-xs text-muted-foreground">
                            Powered by <span className="font-semibold text-primary">ChediiAI</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            v1.0.0 — Azure Connected
                        </p>
                    </div>
                </div>
            )}
        </aside>
    );
}
