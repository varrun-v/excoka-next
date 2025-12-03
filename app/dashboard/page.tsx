import { auth, signOut } from "@/lib/auth/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <form
                    action={async () => {
                        "use server"
                        await signOut()
                    }}
                >
                    <Button variant="outline">Sign Out</Button>
                </form>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Welcome, {session.user.name || session.user.email}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        You are logged in as {session.user.role}.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
