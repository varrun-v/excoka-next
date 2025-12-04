"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { reservationSchema } from "@/lib/validation/reservation.schema"
import { StayDetails } from "./StayDetails"
import { RoomSelection } from "./RoomSelection"
import { GuestDetails } from "./GuestDetails"
import { BillingSidebar } from "./BillingSidebar"
import { AddonsServices } from "./AddonsServices"

export function ReservationForm() {
    const form = useForm<z.infer<typeof reservationSchema>>({
        resolver: zodResolver(reservationSchema) as any,
        defaultValues: {
            checkInTime: "14:00",
            checkOutTime: "11:00",
            adults: 1,
            children: 0,
            reservationType: "confirmed",
            bookingSource: "direct",
            marketSegment: "leisure",
            guestName: "",
            guestEmail: "",
            guestPhone: "",
            emailConfirmation: false,
            emailInvoice: false,
            guestPortalAccess: false,
            paymentMethod: "pending",
            paymentStatus: "pay_now",
            billTo: "guest",
            rooms: [],
            addons: [],
        },
    })

    function onSubmit(values: z.infer<typeof reservationSchema>) {
        console.log(values)
        // TODO: Submit to API
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-start">
                <div className="space-y-6">
                    <StayDetails form={form} />
                    <RoomSelection form={form} />
                    <GuestDetails form={form} />
                    <AddonsServices />
                </div>

                <div className="xl:sticky xl:top-6">
                    <BillingSidebar form={form} />
                </div>
            </form>
        </Form>
    )
}
