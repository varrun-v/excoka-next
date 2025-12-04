"use client"

import { UseFormReturn } from "react-hook-form"
import { User, Search, Ticket, Info } from "lucide-react"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface GuestDetailsProps {
    form: UseFormReturn<any>
}

export function GuestDetails({ form }: GuestDetailsProps) {
    return (
        <Card>
            <CardHeader className="pb-3 border-b mb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <User className="h-5 w-5" />
                    </div>
                    Guest Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Name and Contact */}
                <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr_1fr] gap-4">
                    <FormField
                        control={form.control}
                        name="guestTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Mr." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="mr">Mr.</SelectItem>
                                        <SelectItem value="ms">Ms.</SelectItem>
                                        <SelectItem value="mrs">Mrs.</SelectItem>
                                        <SelectItem value="dr">Dr.</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="guestName"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Guest Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Full Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-end">
                        <Button variant="outline" className="w-full gap-2" type="button">
                            <Search className="h-4 w-4" /> Search Guest
                        </Button>
                    </div>

                    <FormField
                        control={form.control}
                        name="guestPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Mobile</FormLabel>
                                <FormControl>
                                    <Input placeholder="+91 9876543210" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-end">
                        <Button variant="outline" className="w-full gap-2" type="button">
                            <i className="bi bi-file-earmark-text mr-2"></i> C-Form
                        </Button>
                    </div>
                </div>

                {/* Email and Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="guestEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="guest@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="guestAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Street Address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Location Details */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FormField
                        control={form.control}
                        name="guestCountry"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Country" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="india">India</SelectItem>
                                        <SelectItem value="usa">United States</SelectItem>
                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="guestState"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input placeholder="State" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="guestCity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="guestZip"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Zip/PIN" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* ID Proof & DOB */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="guestIdType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ID Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select ID Type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                                        <SelectItem value="pan">PAN Card</SelectItem>
                                        <SelectItem value="passport">Passport</SelectItem>
                                        <SelectItem value="driving_license">Driving License</SelectItem>
                                    </SelectContent>
                                </Select>
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
                                    <Input placeholder="ID Number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="guestDob"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Preferences */}
                <div className="bg-muted/50 p-4 rounded-lg border">
                    <div className="flex flex-wrap gap-6">
                        <FormField
                            control={form.control}
                            name="emailConfirmation"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">Email Voucher</FormLabel>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="emailInvoice"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">Email at Checkout</FormLabel>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="guestPortalAccess"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">Guest Portal Access</FormLabel>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Special Requests */}
                <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Special Requests</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Any special requirements (e.g., early check-in, late checkout, extra bed, dietary restrictions)"
                                    className="min-h-[80px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Coupon Code */}
                <div className="rounded-lg border border-dashed border-amber-400 bg-amber-50/50 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-amber-800">
                            <Ticket className="h-5 w-5" />
                            <span className="font-bold text-sm">Have a Coupon Code?</span>
                        </div>
                        <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white h-8">
                            Apply
                        </Button>
                    </div>
                    <FormField
                        control={form.control}
                        name="discountCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-semibold text-amber-800 uppercase">Enter Coupon Code</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g., WELCOME2024"
                                        className="border-amber-300 focus-visible:ring-amber-400 uppercase bg-white"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] text-amber-800">
                        <Info className="h-3 w-3" />
                        <span>For manual discounts, use <strong>"Apply Discount"</strong> button in Room Selection above</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
