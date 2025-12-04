import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, BedDouble, Hammer, Building2 } from "lucide-react"

interface RoomStatsProps {
    stats: {
        available: number
        occupied: number
        maintenance: number
        total: number
    }
}

export function RoomStats({ stats }: RoomStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-sm font-medium">Available</CardTitle>
                    <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{stats.available}</p>
                    <p className="text-xs text-muted-foreground">
                        {Math.round((stats.available / stats.total) * 100)}% of total
                    </p>
                </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-sm font-medium">Occupied</CardTitle>
                    <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <BedDouble className="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{stats.occupied}</p>
                    <p className="text-xs text-muted-foreground">
                        {Math.round((stats.occupied / stats.total) * 100)}% occupancy
                    </p>
                </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                    <div className="h-8 w-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                        <Hammer className="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{stats.maintenance}</p>
                    <p className="text-xs text-muted-foreground">
                        {Math.round((stats.maintenance / stats.total) * 100)}% of total
                    </p>
                </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
                    <div className="h-8 w-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                        <Building2 className="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Across all floors</p>
                </CardContent>
            </Card>
        </div>
    )
}

