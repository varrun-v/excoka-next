import { useFormContext, useFieldArray } from "react-hook-form"
import {
    FormLabel,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Plus, Star } from "lucide-react"
import { ReservationFormValues } from "@/lib/validation/reservation.schema"

const PREDEFINED_ADDONS = [
    { id: "breakfast", name: "Breakfast Buffet", price: 600, type: "per_night", icon: "🍳", description: "Continental & Indian breakfast" },
    { id: "parking", name: "Parking Space", price: 200, type: "per_night", icon: "🚗", description: "Covered parking" },
    { id: "airport", name: "Airport Transfer", price: 1500, type: "one_time", icon: "✈️", description: "One-way pickup or drop" },
    { id: "earlyCheckin", name: "Early Check-in", price: 500, type: "one_time", icon: "🕐", description: "From 10:00 AM" },
    { id: "lateCheckout", name: "Late Check-out", price: 500, type: "one_time", icon: "🕐", description: "Until 6:00 PM" },
    { id: "extraBed", name: "Extra Bed", price: 800, type: "per_night", icon: "🛏️", description: "Additional bed" },
]

export function AddonsServices() {
    const { control, watch } = useFormContext<ReservationFormValues>()
    const { append, remove } = useFieldArray({
        control,
        name: "addons",
    })

    const selectedAddons = watch("addons") || []

    const handleAddonToggle = (addon: typeof PREDEFINED_ADDONS[0], checked: boolean) => {
        if (checked) {
            append({
                id: addon.id,
                name: addon.name,
                price: addon.price,
                type: addon.type as "per_night" | "one_time",
            })
        } else {
            const index = selectedAddons.findIndex((a) => a.id === addon.id)
            if (index !== -1) {
                remove(index)
            }
        }
    }

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Star className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold leading-none tracking-tight">Add-ons & Services</h3>
                </div>
                <p className="text-sm text-muted-foreground">Enhance your guest's stay with additional services</p>
            </div>
            <div className="p-6 pt-0 grid gap-4">
                {PREDEFINED_ADDONS.map((addon) => {
                    const isSelected = selectedAddons.some((a) => a.id === addon.id)
                    return (
                        <div key={addon.id} className="flex items-center space-x-4 rounded-lg border p-4">
                            <Checkbox
                                id={`addon-${addon.id}`}
                                checked={isSelected}
                                onCheckedChange={(checked) => handleAddonToggle(addon, checked as boolean)}
                            />
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">{addon.icon}</span>
                                    <FormLabel htmlFor={`addon-${addon.id}`} className="font-medium cursor-pointer">
                                        {addon.name}
                                    </FormLabel>
                                </div>
                                <p className="text-xs text-muted-foreground">{addon.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-primary">₹{addon.price}</span>
                                <span className="text-xs text-muted-foreground">
                                    /{addon.type === "per_night" ? "night" : "one-time"}
                                </span>
                            </div>
                        </div>
                    )
                })}

                <Button variant="outline" type="button" className="w-full border-dashed">
                    <Plus className="mr-2 h-4 w-4" /> Add Custom Service
                </Button>
            </div>
        </div>
    )
}
