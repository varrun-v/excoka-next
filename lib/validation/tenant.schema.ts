import * as z from "zod"
import { SubscriptionPlan } from "@prisma/client"

export const createTenantSchema = z.object({
    propertyName: z.string().min(2, "Property name must be at least 2 characters").trim(),
    ownerName: z.string().min(2, "Owner name must be at least 2 characters").trim(),
    ownerEmail: z.string().email("Invalid email address").trim(),
    ownerPassword: z.string().min(8, "Password must be at least 8 characters"),
    plan: z.nativeEnum(SubscriptionPlan),
})

export type CreateTenantInput = z.infer<typeof createTenantSchema>
