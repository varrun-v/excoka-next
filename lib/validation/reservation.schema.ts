import * as z from "zod"

export const reservationSchema = z.object({
    // Stay Details
    checkIn: z.date(),
    checkInTime: z.string().default("14:00"),
    checkOut: z.date(),
    checkOutTime: z.string().default("11:00"),
    adults: z.coerce.number().min(1, "At least 1 adult is required"),
    children: z.coerce.number().min(0).default(0),
    reservationType: z.string().min(1, "Reservation type is required"),
    bookingSource: z.string().optional(),
    marketSegment: z.string().optional(),

    // Guest Details
    guestTitle: z.string().optional(),
    guestName: z.string().min(2, "Guest name must be at least 2 characters"),
    guestEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
    guestPhone: z.string().min(10, "Phone number must be at least 10 digits"),
    guestIdType: z.string().optional(),
    guestIdNumber: z.string().optional(),
    guestDob: z.string().optional(),
    guestAddress: z.string().optional(),
    guestCountry: z.string().optional(),
    guestState: z.string().optional(),
    guestCity: z.string().optional(),
    guestZip: z.string().optional(),
    specialRequests: z.string().optional(),
    discountCode: z.string().optional(),

    // Preferences
    emailConfirmation: z.boolean().default(false),
    emailInvoice: z.boolean().default(false),
    guestPortalAccess: z.boolean().default(false),

    // Payment & Billing
    paymentMethod: z.enum(["cash", "card", "upi", "bank_transfer", "pending"]).default("pending"),
    paymentStatus: z.enum(["pay_now", "pay_later"]).default("pay_now"),
    billTo: z.enum(["guest", "company"]).default("guest"),
    companyName: z.string().optional(),
    companyGst: z.string().optional(),

    // Addons
    addons: z.array(z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        type: z.enum(["per_night", "one_time"]),
    })).default([]),

    // Rooms
    rooms: z.array(z.object({
        roomTypeId: z.string(),
        ratePlanId: z.string(),
        roomNumber: z.string(),
        price: z.coerce.number(),
    })),
})

export type ReservationFormValues = z.infer<typeof reservationSchema>
