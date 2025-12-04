"use client"

import { UseFormReturn } from "react-hook-form"
import { CreditCard, Wallet, Building2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface BillingSidebarProps {
    form: UseFormReturn<any>
}

export function BillingSidebar({ form }: BillingSidebarProps) {
    const billTo = form.watch("billTo")
    const rooms = form.watch("rooms") || []
    const checkIn = form.watch("checkIn")
    const checkOut = form.watch("checkOut")

    // Calculate nights
    const nights = checkIn && checkOut ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))) : 1

    // Calculate totals
    const roomCharges = rooms.reduce((acc: number, room: any) => acc + (Number(room.price) || 0), 0) * nights
    const addonsTotal = 0 // TODO: Calculate from addons
    const discount = 0
    const tax = roomCharges * 0.18 // Assuming 18% GST
    const totalAmount = roomCharges + addonsTotal - discount + tax

    return (
        <Card className="border-2 border-primary/10 shadow-lg sticky top-6">
            <CardHeader className="bg-muted/30 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <CreditCard className="h-5 w-5" />
                    </div>
                    Billing Summary
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    {/* Bill To Section */}
                    <div className="bg-muted/30 p-3 rounded-lg border mb-4">
                        <Label className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Bill To</Label>
                        <FormField
                            control={form.control}
                            name="billTo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid grid-cols-2 gap-2"
                                        >
                                            <div className="flex items-center space-x-2 border rounded-md p-2 bg-background has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                                                <RadioGroupItem value="guest" id="bill-guest" />
                                                <Label htmlFor="bill-guest" className="flex items-center gap-2 cursor-pointer w-full">
                                                    <User className="h-3 w-3" /> Guest
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2 border rounded-md p-2 bg-background has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                                                <RadioGroupItem value="company" id="bill-company" />
                                                <Label htmlFor="bill-company" className="flex items-center gap-2 cursor-pointer w-full">
                                                    <Building2 className="h-3 w-3" /> Company
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {billTo === "company" && (
                            <div className="mt-3 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Company Name" className="h-8 text-sm" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="companyGst"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="GST Number" className="h-8 text-sm" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>

                    {/* Summary Breakdown */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Room Charges ({nights} nights)</span>
                            <span className="font-medium">₹{roomCharges.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Add-ons & Services</span>
                            <span className="font-medium">₹{addonsTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-green-600">
                            <span className="font-medium">Discount</span>
                            <span className="font-medium">- ₹{discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Taxes (GST 18%)</span>
                            <span className="font-medium">₹{tax.toFixed(2)}</span>
                        </div>
                    </div>

                    <Separator className="my-2" />

                    <div className="flex justify-between items-end">
                        <span className="text-base font-bold">Total Amount</span>
                        <span className="text-2xl font-bold text-primary">₹{totalAmount.toFixed(2)}</span>
                    </div>

                    {/* Payment Status */}
                    <div className="bg-muted/50 p-4 rounded-lg mt-4 border">
                        <Label className="mb-3 block text-sm font-semibold">Payment Status</Label>
                        <FormField
                            control={form.control}
                            name="paymentStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid grid-cols-2 gap-2"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="pay_now" id="pay_now" />
                                                <Label htmlFor="pay_now">Pay Now</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="pay_later" id="pay_later" />
                                                <Label htmlFor="pay_later">Pay at Check-in</Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3 pt-2">
                        <Label className="text-sm font-semibold">Payment Method</Label>
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid grid-cols-3 gap-2"
                                        >
                                            <div className="flex flex-col items-center justify-center border rounded-md p-2 hover:bg-muted cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                                                <RadioGroupItem value="cash" id="cash" className="sr-only" />
                                                <Label htmlFor="cash" className="cursor-pointer flex flex-col items-center gap-1 w-full">
                                                    <Wallet className="h-4 w-4" />
                                                    <span className="text-xs">Cash</span>
                                                </Label>
                                            </div>
                                            <div className="flex flex-col items-center justify-center border rounded-md p-2 hover:bg-muted cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                                                <RadioGroupItem value="card" id="card" className="sr-only" />
                                                <Label htmlFor="card" className="cursor-pointer flex flex-col items-center gap-1 w-full">
                                                    <CreditCard className="h-4 w-4" />
                                                    <span className="text-xs">Card</span>
                                                </Label>
                                            </div>
                                            <div className="flex flex-col items-center justify-center border rounded-md p-2 hover:bg-muted cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                                                <RadioGroupItem value="upi" id="upi" className="sr-only" />
                                                <Label htmlFor="upi" className="cursor-pointer flex flex-col items-center gap-1 w-full">
                                                    <span className="font-bold text-xs">UPI</span>
                                                    <span className="text-xs">Scan</span>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="pt-4 space-y-3">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10">
                            Make Payment
                        </Button>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 text-base shadow-lg shadow-primary/20">
                            Confirm Reservation
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="w-full font-semibold">
                                Save Draft
                            </Button>
                            <Button variant="outline" className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/20">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
