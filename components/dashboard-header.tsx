import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import Link from "next/link"
import { auth } from "@/lib/auth/auth"

export async function DashboardHeader() {
    const session = await auth()
    return (
        <header className="border-b">
            <div className="flex h-16 items-center px-4">
                <div className="hidden md:flex">
                    <Link href="/dashboard" className="font-bold text-2xl mr-4">
                        Tidedesk
                    </Link>
                </div>
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <UserNav user={session?.user} />
                </div>
            </div>
        </header>
    )
}
