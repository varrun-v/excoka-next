"use client"

import { UseFormReturn } from "react-hook-form"
import { format, differenceInDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StayDetailsProps {
    form: UseFormReturn<any>
}

export function StayDetails({ form }: StayDetailsProps) {
    const checkIn = form.watch("checkIn")
    const checkOut = form.watch("checkOut")

    const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0

    return (
        <Card>
            <CardHeader className="pb-3 border-b">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <CalendarIcon className="h-5 w-5" />
                    </div>
                    Stay & Booking Details
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Check-in/out */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_120px_1fr_120px_120px] gap-4 items-end">
                    {/* Check-In */}
                    <FormField
                        control={form.control}
                        name="checkIn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="required">Check-in Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="start" className="p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(d) => d < new Date()}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Check-In Time */}
                    <FormField
                        control={form.control}
                        name="checkInTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time</FormLabel>
                                <Input type="time" {...field} />
                            </FormItem>
                        )}
                    />

                    {/* Check-Out */}
                    <FormField
                        control={form.control}
                        name="checkOut"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="required">Check-out Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="start" className="p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(d) => d <= (checkIn ?? new Date())}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />

                    {/* Check-Out Time */}
                    <FormField
                        control={form.control}
                        name="checkOutTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time</FormLabel>
                                <Input type="time" {...field} />
                            </FormItem>
                        )}
                    />

                    {/* Nights */}
                    <div className="flex flex-col items-center gap-2 lg:pb-2">
                        <FormLabel>Nights</FormLabel>
                        <div className="bg-primary/10 text-primary font-bold px-4 py-2 rounded-lg min-w-[80px] text-center">
                            {nights > 0 ? nights : 0}
                        </div>
                    </div>
                </div>

                {/* Booking Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Reservation Type */}
                    <FormField
                        control={form.control}
                        name="reservationType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="required">Reservation Type</FormLabel>
                                <Select {...field} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="confirmed">Confirmed</SelectItem>
                                        <SelectItem value="tentative">Tentative</SelectItem>
                                        <SelectItem value="waitlist">Waitlist</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    {/* Booking Source */}
                    <FormField
                        control={form.control}
                        name="bookingSource"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Booking Source</FormLabel>
                                <Select {...field} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Source" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="direct">Direct</SelectItem>
                                        <SelectItem value="website">Website</SelectItem>
                                        <SelectItem value="booking.com">Booking.com</SelectItem>
                                        <SelectItem value="makemytrip">MakeMyTrip</SelectItem>
                                        <SelectItem value="goibibo">Goibibo</SelectItem>
                                        <SelectItem value="oyo">OYO</SelectItem>
                                        <SelectItem value="expedia">Expedia</SelectItem>
                                        <SelectItem value="phone">Phone</SelectItem>
                                        <SelectItem value="walkin">Walk-in</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    {/* Market Segment */}
                    <FormField
                        control={form.control}
                        name="marketSegment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Market Segment</FormLabel>
                                <Select {...field} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Segment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="corporate">Corporate</SelectItem>
                                        <SelectItem value="leisure">Leisure</SelectItem>
                                        <SelectItem value="group">Group</SelectItem>
                                        <SelectItem value="government">Government</SelectItem>
                                        <SelectItem value="travel_agent">Travel Agent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

