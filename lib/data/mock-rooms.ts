export interface Room {
    id: string
    number: string
    type: "Standard" | "Deluxe" | "Suite" | "Executive"
    floor: number
    status: "Available" | "Occupied" | "Maintenance" | "Dirty"
    price: number
    amenities: string[]
}

export const MOCK_ROOMS: Room[] = [
    {
        id: "1",
        number: "101",
        type: "Standard",
        floor: 1,
        status: "Available",
        price: 2000,
        amenities: ["WiFi", "TV", "AC"],
    },
    {
        id: "2",
        number: "101A",
        type: "Standard",
        floor: 1,
        status: "Available",
        price: 3500,
        amenities: ["WiFi", "TV", "AC"],
    },
    {
        id: "3",
        number: "102",
        type: "Deluxe",
        floor: 1,
        status: "Occupied",
        price: 2000,
        amenities: ["WiFi", "TV", "AC", "Mini Bar"],
    },
    {
        id: "4",
        number: "201",
        type: "Deluxe",
        floor: 2,
        status: "Available",
        price: 5000,
        amenities: ["WiFi", "TV", "AC", "Balcony"],
    },
    {
        id: "5",
        number: "301",
        type: "Executive",
        floor: 3,
        status: "Maintenance",
        price: 7000,
        amenities: ["WiFi", "TV", "AC", "Mini Bar", "Balcony", "Sea View"],
    },
    {
        id: "6",
        number: "401",
        type: "Suite",
        floor: 4,
        status: "Available",
        price: 10000,
        amenities: ["WiFi", "TV", "AC", "Room Service", "Bathtub"],
    },
]

export const ROOM_STATS = {
    available: 6,
    occupied: 0,
    maintenance: 0,
    total: 6,
}
