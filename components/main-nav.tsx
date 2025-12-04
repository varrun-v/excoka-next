"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"

const navItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Reservations",
        href: "/dashboard/reservations",
    },
    {
        title: "Rooms",
        href: "/dashboard/rooms",
    },
    {
        title: "Bookings",
        href: "/dashboard/bookings",
    },
    {
        title: "Guests",
        href: "/dashboard/guests",
    },
    {
        title: "Marketing",
        href: "/dashboard/marketing",
    },
    {
        title: "Dynamic Pricing",
        href: "/dashboard/pricing",
    },
    {
        title: "Analytics",
        href: "/dashboard/analytics",
    },
]

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <div className="flex items-center">
            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="lg:hidden p-0 w-10 h-10">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pr-0">
                    <div className="px-7">
                        <Link
                            href="/dashboard"
                            className="flex items-center"
                            onClick={() => setOpen(false)}
                        >
                            <span className="font-bold text-2xl">Tidedesk</span>
                        </Link>
                    </div>
                    <nav className="flex flex-col gap-4 px-2 mt-5">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "block px-5 py-3 text-sm font-medium transition-colors hover:text-primary rounded-md",
                                    pathname === item.href
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>

            {/* Desktop Menu */}
            <nav
                className={cn("hidden lg:flex items-center space-x-4 lg:space-x-6 mx-6", className)}
                {...props}
            >
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            pathname === item.href
                                ? "text-primary"
                                : "text-muted-foreground"
                        )}
                    >
                        {item.title}
                    </Link>
                ))}
            </nav>
        </div>
    )
}
