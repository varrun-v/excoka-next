import { Metadata } from "next"
import { Plus, LayoutGrid, ListFilter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RoomStats } from "@/components/rooms/RoomStats"
import { RoomFilters } from "@/components/rooms/RoomFilters"
import { RoomGrid } from "@/components/rooms/RoomGrid"
import { MOCK_ROOMS, ROOM_STATS } from "@/lib/data/mock-rooms"

export const metadata: Metadata = {
    title: "Room Management",
    description: "Manage hotel rooms and inventory",
}

export default function RoomsPage() {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Room Management</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline">
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Room Categories
                    </Button>
                    <Button variant="outline">
                        <ListFilter className="mr-2 h-4 w-4" />
                        Bulk Operations
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Room
                    </Button>
                </div>
            </div>

            <RoomStats stats={ROOM_STATS} />

            <div className="space-y-4">
                <RoomFilters />
                <RoomGrid rooms={MOCK_ROOMS} />
            </div>
        </div>
    )
}
