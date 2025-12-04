import { ReservationForm } from "@/components/reservations/ReservationForm"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ReservationPage() {
    return (
        <div className="container mx-auto max-w-[1800px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        Reservation
                    </h1>
                    <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-100">
                        Draft • Not Saved
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/reservations">
                        <Button variant="outline" className="gap-2 bg-white/50 backdrop-blur-sm">
                            <ArrowLeft className="h-4 w-4" /> View All Bookings
                        </Button>
                    </Link>
                </div>
            </div>

            <ReservationForm />
        </div>
    )
}
