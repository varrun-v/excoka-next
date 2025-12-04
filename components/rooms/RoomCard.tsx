import { Room } from "@/lib/data/mock-rooms"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DoorOpen, Wifi, Tv, Wind, Coffee, Bath, Utensils, Edit, CalendarCheck } from "lucide-react"

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
        <Card className="overflow-hidden border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <Badge variant="secondary" className="font-normal text-xs">
                    <DoorOpen className="h-3 w-3 mr-1" /> Status
                </Badge>
                <Badge className={`${statusColors[room.status]} text-white border-0`}>
                    {room.status}
                </Badge>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <div className="flex justify-center py-4">
                    <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                        <DoorOpen className="h-8 w-8" />
                    </div>
                </div>
                <div className="text-center space-y-1 mb-4">
                    <h3 className="font-bold text-lg">Room {room.number}</h3>
                    <p className="text-sm text-muted-foreground">{room.type} • Floor {room.floor}</p>
                    <div className="text-primary font-bold text-lg">
                        ₹{room.price.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/night</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                    {room.amenities.slice(0, 3).map((amenity) => {
                        const Icon = amenityIcons[amenity] || CheckCircle2
                        return (
                            <Badge key={amenity} variant="outline" className="text-[10px] px-2 py-0.5 h-5 gap-1 font-normal bg-muted/50">
                                <Icon className="h-3 w-3" /> {amenity}
                            </Badge>
                        )
                    })}
                    {room.amenities.length > 3 && (
                        <Badge variant="outline" className="text-[10px] px-2 py-0.5 h-5 font-normal bg-muted/50">
                            +{room.amenities.length - 3}
                        </Badge>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
                <Button className="w-full bg-primary/90 hover:bg-primary text-xs h-8">
                    <CalendarCheck className="h-3 w-3 mr-1" /> Book Now
                </Button>
                <Button variant="outline" className="w-full text-xs h-8">
                    <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
            </CardFooter>
        </Card>
    )
}

import { CheckCircle2 } from "lucide-react"
