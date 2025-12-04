import { auth, signOut } from "@/lib/auth/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"
import { CreateTenantDialog } from "./create-tenant-dialog"

async function getTenants() {
    return await prisma.tenant.findMany({
        include: {
            memberships: {
                where: { role: "ADMIN" }, // Changed from OWNER to ADMIN as OWNER role was removed
                include: { user: true }
            }
        },
        orderBy: { createdAt: "desc" }
    })
}

export default async function AdminDashboard() {
    const session = await auth()

    if (session?.user?.role !== "MASTER_ADMIN") {
        // redirect("/") // Uncomment after role logic is fixed in auth.ts
    }

    const tenants = await getTenants()

    return (
        <div className="flex min-h-screen flex-col bg-muted/40">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Master Admin Dashboard</h2>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center gap-4">
                            <CreateTenantDialog />
                            <form
                                action={async () => {
                                    "use server"
                                    await signOut()
                                }}
                            >
                                <Button variant="outline">Sign Out</Button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{tenants.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {tenants.filter(t => t.isActive).length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Properties</CardTitle>
                        <CardDescription>
                            Manage all registered properties and their subscriptions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Property Name</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Plan</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tenants.map((tenant) => (
                                    <TableRow key={tenant.id}>
                                        <TableCell className="font-medium">{tenant.name}</TableCell>
                                        <TableCell>{tenant.propertyCode}</TableCell>
                                        <TableCell>
                                            {tenant.memberships[0]?.user.email || "No Owner"}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{tenant.subscriptionPlan}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={tenant.isActive ? "default" : "destructive"}>
                                                {tenant.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">Manage</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
