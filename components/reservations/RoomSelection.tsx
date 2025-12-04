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
            <CardHeader className="pb-3 border-b">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <BedDouble className="h-5 w-5" />
                    </div>
                    Room Selection
                </CardTitle>
            </CardHeader>

            <CardContent>
                {/* Toggles */}
                <div className="bg-muted/40 p-4 rounded-lg mb-6 border">
                    <div className="flex flex-wrap gap-4">
                        {[
                            ["contract", "Contract Rate"],
                            ["book-all", "Book All Rooms"],
                            ["group", "Group Booking"],
                            ["complimentary", "Complimentary"],
                        ].map(([id, label]) => (
                            <div key={id} className="flex items-center space-x-2">
                                <Checkbox id={id} />
                                <Label htmlFor={id}>{label}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Room fields */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1.5fr_1fr_100px_100px_140px_auto] gap-4 items-end">
                        {/* Room Type */}
                        <div className="space-y-2">
                            <Label className="required">Room Type</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Room Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="standard">Standard</SelectItem>
                                    <SelectItem value="deluxe">Deluxe</SelectItem>
                                    <SelectItem value="suite">Suite</SelectItem>
                                    <SelectItem value="executive">Executive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Rate Plan */}
                        <div className="space-y-2">
                            <Label>Rate Plan</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="standard">Standard Rate</SelectItem>
                                    <SelectItem value="corporate">Corporate Rate</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Room No */}
                        <div className="space-y-2">
                            <Label className="required">Room No.</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="101">101</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Adults */}
                        <div className="space-y-2">
                            <Label className="required">Adults</Label>
                            <Input type="number" min={1} defaultValue={1} />
                        </div>

                        {/* Child */}
                        <div className="space-y-2">
                            <Label>Child</Label>
                            <Input type="number" min={0} defaultValue={0} />
                        </div>

                        {/* Rate */}
                        <div className="space-y-2">
                            <Label className="required">Rate (₹)</Label>
                            <Input type="number" placeholder="0.00" />
                        </div>

                        {/* Add button */}
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white whitespace-nowrap">
                            <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button variant="outline" className="text-amber-600 border-amber-200 hover:bg-amber-50">
                            <Percent className="h-4 w-4 mr-2" /> Apply Discount
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

