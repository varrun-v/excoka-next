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
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-4 items-end">
                    <FormField
                        control={form.control}
                        name="checkIn"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Check-in Date</FormLabel>
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

                    <div className="hidden md:flex flex-col items-center justify-center pb-2">
                        <div className="bg-primary/10 text-primary font-bold px-4 py-2 rounded-lg min-w-[80px] text-center">
                            {nights > 0 ? nights : 0} Nights
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name="checkOut"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Check-out Date</FormLabel>
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

                    <div className="grid grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name="adults"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adults</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={1} {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="children"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Children</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={0} {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
