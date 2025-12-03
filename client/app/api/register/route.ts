
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password, name, tenantName } = await req.json();

        if (!email || !password || !name || !tenantName) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Transaction to create User, Tenant, and Link them
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create User
            const user = await tx.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                },
            });

            // 2. Create Tenant
            // Generate a simple slug from name (this is a basic implementation)
            const slug = tenantName.toLowerCase().replace(/ /g, "-") + "-" + Math.floor(Math.random() * 10000);

            const tenant = await tx.tenant.create({
                data: {
                    name: tenantName,
                    slug,
                },
            });

            // 3. Link User to Tenant as OWNER
            await tx.tenantUser.create({
                data: {
                    userId: user.id,
                    tenantId: tenant.id,
                    role: "OWNER",
                },
            });

            return { user, tenant };
        });

        return NextResponse.json(
            { message: "User and Tenant created successfully", user: result.user },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
