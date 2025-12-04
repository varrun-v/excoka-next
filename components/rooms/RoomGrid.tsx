import { Room } from "@/lib/data/mock-rooms"
import { RoomCard } from "./RoomCard"

interface RoomGridProps {
    rooms: Room[]
}

export function RoomGrid({ rooms }: RoomGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
            ))}
        </div>
    )
}
