"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const navItems = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Reservations", href: "/dashboard/reservations" },
    { title: "Rooms", href: "/dashboard/rooms" },
    { title: "Bookings", href: "/dashboard/bookings" },
    { title: "Guests", href: "/dashboard/guests" },
    { title: "Marketing", href: "/dashboard/marketing" },
    { title: "Dynamic Pricing", href: "/dashboard/pricing" },
    { title: "Analytics", href: "/dashboard/analytics" },
]

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <div className="flex items-center">
            {/* MOBILE MENU */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="lg:hidden p-0 w-10 h-10">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="pr-0">
                    {/* Branding */}
                    <div className="px-6 py-4 border-b">
                        <Link
                            href="/dashboard"
                            className="flex items-center"
                            onClick={() => setOpen(false)}
                        >
                            <span className="font-bold text-2xl tracking-tight">
                                Tidedesk
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-1 px-3 py-4">
                        {navItems.map((item) => {
                            const active = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        "px-4 py-3 rounded-md text-sm font-medium transition-all",
                                        active
                                            ? "bg-muted text-primary shadow-sm"
                                            : "text-muted-foreground hover:text-primary hover:bg-muted/60"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            )
                        })}
                    </nav>
                </SheetContent>
            </Sheet>

            {/* DESKTOP MENU */}
            <nav
                className={cn(
                    "hidden lg:flex items-center gap-6 ml-6",
                    className
                )}
                {...props}
            >
                {navItems.map((item) => {
                    const active = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors",
                                active
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-primary"
                            )}
                        >
                            {item.title}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
