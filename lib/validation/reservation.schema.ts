import * as z from "zod"

export const reservationSchema = z.object({
    // Stay Details
    checkIn: z.date(),
    checkOut: z.date(),
    adults: z.coerce.number().min(1, "At least 1 adult is required"),
    children: z.coerce.number().min(0).default(0),

    // Guest Details
    guestName: z.string().min(2, "Guest name must be at least 2 characters"),
    guestEmail: z.string().email("Invalid email address"),
    guestPhone: z.string().min(10, "Phone number must be at least 10 digits"),
    guestIdType: z.string().optional(),
    guestIdNumber: z.string().optional(),
    guestAddress: z.string().optional(),

    // Preferences
    emailConfirmation: z.boolean().default(false),
    emailInvoice: z.boolean().default(false),

    // Payment
    paymentMethod: z.enum(["cash", "card", "online", "pending"]).default("pending"),

    // Rooms (Simplified for now, will be array of objects later)
    rooms: z.array(z.object({
        roomTypeId: z.string(),
        ratePlanId: z.string(),
        roomNumber: z.string(),
        price: z.coerce.number(),
    })),
})

export type ReservationFormValues = z.infer<typeof reservationSchema>
