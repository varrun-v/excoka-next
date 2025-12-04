import { ReservationForm } from "@/components/reservations/ReservationForm"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ReservationPage() {
    return (
        <div className="container mx-auto max-w-[1600px] px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Reservation
                </h1>

                <Link href="/dashboard/reservations">
                    <Button variant="outline" className="gap-2 bg-white/60 backdrop-blur-sm">
                        <ArrowLeft className="h-4 w-4" /> View All Bookings
                    </Button>
                </Link>
            </div>

            <ReservationForm />
        </div>
    )
}

