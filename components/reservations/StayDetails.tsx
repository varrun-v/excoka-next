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
            <CardHeader className="pb-3 border-b mb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <CalendarIcon className="h-5 w-5" />
                    </div>
                    Stay & Booking Details
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Check-in / Check-out Row */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_auto] gap-4 items-end">
                    {/* Check-in Date */}
                    <FormField
                        control={form.control}
                        name="checkIn"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Check-in Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Check-in Time */}
                    <FormField
                        control={form.control}
                        name="checkInTime"
                        render={({ field }) => (
                            <FormItem className="w-[100px]">
                                <FormLabel>Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Check-out Date */}
                    <FormField
                        control={form.control}
                        name="checkOut"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Check-out Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date <= (checkIn || new Date())
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Check-out Time */}
                    <FormField
                        control={form.control}
                        name="checkOutTime"
                        render={({ field }) => (
                            <FormItem className="w-[100px]">
                                <FormLabel>Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Nights Badge */}
                    <div className="hidden md:flex flex-col items-center justify-center pb-2">
                        <FormLabel className="mb-2">Nights</FormLabel>
                        <div className="bg-primary/10 text-primary font-bold px-4 py-2 rounded-lg min-w-[80px] text-center flex items-center gap-2">
                            <i className="bi bi-moon-stars-fill"></i>
                            {nights > 0 ? nights : 0}
                        </div>
                    </div>
                </div>

                {/* Booking Details Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="reservationType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Reservation Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="confirmed">Confirmed</SelectItem>
                                        <SelectItem value="tentative">Tentative</SelectItem>
                                        <SelectItem value="waitlist">Waitlist</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bookingSource"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Booking Source</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Source" />
                                        </SelectTrigger>
                                    </FormControl>
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="marketSegment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Market Segment</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Segment" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="corporate">Corporate</SelectItem>
                                        <SelectItem value="leisure">Leisure</SelectItem>
                                        <SelectItem value="group">Group</SelectItem>
                                        <SelectItem value="government">Government</SelectItem>
                                        <SelectItem value="travel_agent">Travel Agent</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
