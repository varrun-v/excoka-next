"use client"

import { UseFormReturn } from "react-hook-form"
import { CreditCard } from "lucide-react"
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

interface BillingSidebarProps {
    form: UseFormReturn<any>
}

export function BillingSidebar({ form }: BillingSidebarProps) {
    return (
        <Card className="border-2 border-primary/10 shadow-lg">
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
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Room Charges</span>
                        <span className="font-bold">$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Taxes & Fees</span>
                        <span className="font-bold">$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Extra Services</span>
                        <span className="font-bold">$0.00</span>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-end">
                        <span className="text-base font-bold">Total Amount</span>
                        <span className="text-2xl font-bold text-primary">$0.00</span>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg mt-6 border">
                        <Label className="mb-3 block text-sm font-semibold">Payment Method</Label>
                        <RadioGroup defaultValue="pending" className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cash" id="cash" />
                                <Label htmlFor="cash">Cash</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card">Card</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="online" id="online" />
                                <Label htmlFor="online">Online</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pending" id="pending" />
                                <Label htmlFor="pending">Pending</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="pt-4 space-y-3">
                        <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-bold h-12 text-base shadow-lg shadow-primary/20">
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
