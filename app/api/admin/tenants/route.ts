import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { auth } from "@/lib/auth/auth"

import { createTenantSchema } from "@/lib/validation/tenant.schema"

import { requireRole } from "@/lib/permissions/rbac"

export async function POST(req: Request) {
    try {
        await requireRole("MASTER_ADMIN")

        const body = await req.json()

        const validation = createTenantSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { message: "Invalid input", errors: validation.error.flatten() },
                { status: 400 }
            )
        }

        const { propertyName, ownerName, ownerEmail, ownerPassword, plan } = validation.data

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: ownerEmail },
        })

        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(ownerPassword, 10)

        // Generate slug and code
        const slug = propertyName.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Math.floor(Math.random() * 1000)
        const propertyCode = "PRP" + Math.floor(1000 + Math.random() * 9000)

        // Transaction
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create Tenant
            const tenant = await tx.tenant.create({
                data: {
                    name: propertyName,
                    slug,
                    propertyCode,
                    subscriptionPlan: plan,
                    contactName: ownerName,
                    contactEmail: ownerEmail,
                },
            })

            // 2. Create User
            const user = await tx.user.create({
                data: {
                    email: ownerEmail,
                    name: ownerName,
                    password: hashedPassword,
                    role: "OWNER",
                },
            })

            // 3. Link User to Tenant
            await tx.tenantUser.create({
                data: {
                    userId: user.id,
                    tenantId: tenant.id,
                    role: "OWNER",
                },
            })

            return tenant
        })

        return NextResponse.json(result, { status: 201 })
    } catch (error) {
        console.error("Create tenant error:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}
