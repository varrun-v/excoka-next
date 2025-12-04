"use client"

import { UseFormReturn } from "react-hook-form"
import { BedDouble, Plus, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface RoomSelectionProps {
    form: UseFormReturn<any>
}

export function RoomSelection({ form }: RoomSelectionProps) {
    return (
        <Card>
            <CardHeader className="pb-3 border-b mb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <BedDouble className="h-5 w-5" />
                    </div>
                    Room Selection
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg mb-6 border">
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="contract" />
                            <Label htmlFor="contract">Contract Rate</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="book-all" />
                            <Label htmlFor="book-all">Book All Rooms</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="group" />
                            <Label htmlFor="group">Group Booking</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="complimentary" />
                            <Label htmlFor="complimentary">Complimentary</Label>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-[2fr_1.5fr_1fr_80px_80px_120px_auto] gap-3 items-end">
                        <div className="space-y-2">
                            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">Room Type</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Room Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="standard">Standard Room</SelectItem>
                                    <SelectItem value="deluxe">Deluxe Room</SelectItem>
                                    <SelectItem value="suite">Suite</SelectItem>
                                    <SelectItem value="executive">Executive Room</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Rate Plan</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Standard Rate" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="standard">Standard Rate</SelectItem>
                                    <SelectItem value="corporate">Corporate Rate</SelectItem>
                                    <SelectItem value="weekend">Weekend Special</SelectItem>
                                    <SelectItem value="longstay">Long Stay</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">Room No.</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="101">101</SelectItem>
                                    <SelectItem value="102">102</SelectItem>
                                    <SelectItem value="201">201</SelectItem>
                                    <SelectItem value="202">202</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">Adults</Label>
                            <Input type="number" min={1} defaultValue={1} />
                        </div>

                        <div className="space-y-2">
                            <Label>Child</Label>
                            <Input type="number" min={0} defaultValue={0} />
                        </div>

                        <div className="space-y-2">
                            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">Rate (₹)</Label>
                            <Input type="number" placeholder="0.00" />
                        </div>

                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button variant="outline" className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700">
                            <Percent className="h-4 w-4 mr-2" /> Apply Discount
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
