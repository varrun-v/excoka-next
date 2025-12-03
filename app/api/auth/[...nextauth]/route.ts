
import { handlers } from "@/lib/auth/auth"
import rateLimit from "@/lib/rate-limit"
import { NextResponse, NextRequest } from "next/server"

const limiter = rateLimit({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 500,
})

export const GET = handlers.GET

export async function POST(req: NextRequest) {
    try {
        // Rate limit based on IP
        const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
        await limiter.check(10, ip) // 10 requests per minute per IP
    } catch {
        return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
    }

    return handlers.POST(req)
}
