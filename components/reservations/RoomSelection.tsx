"use client"

import { UseFormReturn } from "react-hook-form"
import { BedDouble, Plus } from "lucide-react"
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
                    Select Rooms & Rates
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
                            <Checkbox id="complimentary" />
                            <Label htmlFor="complimentary">Complimentary</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="house-use" />
                            <Label htmlFor="house-use">House Use</Label>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-[2fr_1.5fr_1fr_80px_80px_120px_auto] gap-3 items-end">
                        <div className="space-y-2">
                            <Label>Room Type</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Room" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="deluxe">Deluxe Room</SelectItem>
                                    <SelectItem value="suite">Executive Suite</SelectItem>
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
                                    <SelectItem value="breakfast">Bed & Breakfast</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Room No.</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Auto" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="101">101</SelectItem>
                                    <SelectItem value="102">102</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Adults</Label>
                            <Input type="number" min={1} defaultValue={2} />
                        </div>

                        <div className="space-y-2">
                            <Label>Child</Label>
                            <Input type="number" min={0} defaultValue={0} />
                        </div>

                        <div className="space-y-2">
                            <Label>Rate</Label>
                            <Input type="number" placeholder="0.00" />
                        </div>

                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
