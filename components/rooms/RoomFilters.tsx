"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export function RoomFilters() {
    return (
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by room number, type, floor..."
                    className="pl-9 h-10"
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
                <Button variant="secondary">All</Button>
                <Button variant="outline">Available</Button>
                <Button variant="outline">Occupied</Button>
                <Button variant="outline">Maintenance</Button>
            </div>
        </div>
    )
}
