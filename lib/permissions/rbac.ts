import { auth } from "@/lib/auth/auth"
import { Role } from "@prisma/client"
import { redirect } from "next/navigation"

export async function requireRole(requiredRole: Role) {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    if (session.user.role !== requiredRole) {
        // In API routes, we might want to return 403, but for server actions/components redirect or throw is common.
        // For strict API usage, we can throw an error and handle it, or return null/false.
        // Since this is a helper, let's throw a custom error or return the session if valid.
        throw new Error("Unauthorized: Insufficient permissions")
    }

    return session
}

export async function getCurrentUser() {
    const session = await auth()
    return session?.user
}
