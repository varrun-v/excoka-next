"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export function RoomFilters() {
    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search rooms by number, category, floor, or status..."
                    className="pl-9 h-10 bg-background w-full"
                />
            </div>
            {/* Filter Tabs */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-2/3">
                <div className="flex gap-2">
                    <Button variant="default" className="flex-1 md:flex-none">All</Button>
                    <Button variant="default" className="flex-1 md:flex-none">Available</Button>
                    <Button variant="default" className="flex-1 md:flex-none">Occupied</Button>
                    <Button variant="default" className="flex-1 md:flex-none">Maintenance</Button>
                </div>
            </div>
        </div>
    )
}
