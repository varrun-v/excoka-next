"use client"

import { UseFormReturn } from "react-hook-form"
import { User, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface GuestDetailsProps {
    form: UseFormReturn<any>
}

export function GuestDetails({ form }: GuestDetailsProps) {
    return (
        <Card>
            <CardHeader className="pb-3 border-b mb-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <User className="h-5 w-5" />
                        </div>
                        Guest Details
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Search className="h-4 w-4" /> Search Guest
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Plus className="h-4 w-4" /> Add New
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField
                        control={form.control}
                        name="guestName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="guestEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="john@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="guestPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="+1 234 567 8900" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="guestIdType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID Type</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Passport" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="guestIdNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="AB123456" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="guestAddress"
                    render={({ field }) => (
                        <FormItem className="mb-6">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter full address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="bg-muted/50 p-4 rounded-lg border">
                    <div className="flex flex-wrap gap-6">
                        <FormField
                            control={form.control}
                            name="emailConfirmation"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Send Confirmation Email
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="emailInvoice"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Send Invoice Email
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
