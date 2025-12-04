"use client"

import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function RoomFilters() {
    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search rooms by number, category, floor, or status..."
                    className="pl-9 h-10 bg-background"
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full sm:w-auto flex-1">
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Rooms" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Rooms</SelectItem>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="occupied">Occupied</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="deluxe">Deluxe</SelectItem>
                            <SelectItem value="suite">Suite</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Floors" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Floors</SelectItem>
                            <SelectItem value="1">Floor 1</SelectItem>
                            <SelectItem value="2">Floor 2</SelectItem>
                            <SelectItem value="3">Floor 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button className="bg-primary hover:bg-primary/90 text-white flex-1 sm:flex-none">
                        <Filter className="h-4 w-4 mr-2" /> Apply Filters
                    </Button>
                    <Button variant="outline" className="text-muted-foreground flex-1 sm:flex-none">
                        <X className="h-4 w-4 mr-2" /> Clear
                    </Button>
                </div>
            </div>
        </div>
    )
}
