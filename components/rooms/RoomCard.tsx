import { Room } from "@/lib/data/mock-rooms"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DoorOpen, Wifi, Tv, Wind, Coffee, Bath, Utensils, Edit } from "lucide-react"

interface RoomCardProps {
    room: Room
}

const amenityIcons: Record<string, any> = {
    "WiFi": Wifi,
    "TV": Tv,
    "AC": Wind,
    "Mini Bar": Coffee,
    "Bathtub": Bath,
    "Room Service": Utensils,
    "Balcony": DoorOpen,
    "Sea View": Wind, // Placeholder
}

const statusColors: Record<string, string> = {
    "Available": "bg-emerald-500 hover:bg-emerald-600",
    "Occupied": "bg-blue-500 hover:bg-blue-600",
    "Maintenance": "bg-amber-500 hover:bg-amber-600",
    "Dirty": "bg-red-500 hover:bg-red-600",
}

export function RoomCard({ room }: RoomCardProps) {
    return (
        <Card className="overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-all">
            {/* Header */}
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                <Badge variant="secondary" className="text-[10px] font-medium">
                    Status
                </Badge>
                <Badge className={`${statusColors[room.status]} text-white text-[10px] px-2 py-0.5`}>
                    {room.status}
                </Badge>
            </CardHeader>

            {/* Icon + Room Info */}
            <CardContent className="px-4 pb-3">
                <div className="flex justify-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <DoorOpen className="h-5 w-5" />
                    </div>
                </div>

                <div className="text-center space-y-1 mb-3">
                    <h3 className="font-semibold text-sm">Room {room.number}</h3>
                    <p className="text-xs text-muted-foreground">
                        {room.type} • Floor {room.floor}
                    </p>
                    <p className="text-sm font-semibold text-primary">
                        ₹{room.price.toLocaleString()}
                        <span className="text-xs text-muted-foreground ml-1">/night</span>
                    </p>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {room.amenities.slice(0, 3).map((amenity) => {
                        const Icon = amenityIcons[amenity] || CheckCircle2
                        return (
                            <Badge
                                key={amenity}
                                variant="outline"
                                className="text-[10px] px-2 py-0.5 h-5 gap-1 bg-muted/40"
                            >
                                <Icon className="h-3 w-3" /> {amenity}
                            </Badge>
                        )
                    })}

                    {room.amenities.length > 3 && (
                        <Badge
                            variant="outline"
                            className="text-[10px] px-2 py-0.5 h-5 bg-muted/40"
                        >
                            +{room.amenities.length - 3}
                        </Badge>
                    )}
                </div>
            </CardContent>

            <CardFooter className="p-2 pt-0 flex justify-end">
                <Button variant="ghost" className="p-1 h-7 w-7">
                    <Edit className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}

import { CheckCircle2 } from "lucide-react"
