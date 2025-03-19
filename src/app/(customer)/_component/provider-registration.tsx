"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { boolean, z } from "zod";
import { sendEmail } from "@/lib/email";

const serviceProviderSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    service: z.string().min(3, "Service type must be at least 3 characters"),
    location: z.string().min(3, "Location must be at least 3 characters"),
    mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});

export default function JoinProviderButton() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: "",
        service: "",
        location: "",
        mobile: "",
        serviceRequest:false,
    });

    const handleSubmit = async () => {
        try{
            setIsloading(true);
            const result = serviceProviderSchema.safeParse(formData);

            if (!result.success) {
                toast.error("Please check the mobile number and ensure all fields are filled correctly");
                return;
            }
    
            const success = await sendEmail(formData);
            if (success) {
                toast.success("Your request has been submitted!");
            } else {
                toast.error("Error submitting the request. Please try again.");
                return;
            }
    
            setFormData({ name: "", service: "", location: "", mobile: "",serviceRequest:false});
            setOpen(false);
        }finally{
            setIsloading(false);
        }
    };

    return (
        <div className="flex justify-center pt-4 px-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }}>
                <Button
                    onClick={() => setOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                >
                    Join as a Service Provider
                </Button>
            </motion.div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-serif">Join as a Service Provider</DialogTitle>
                        <DialogDescription className="text-sm text-gray-600 italic">
                            Whether you provide skilled labor (plumber, electrician, carpenter, etc.) or sell construction materials
                            like bricks, sand, cement, and other supplies—this is your opportunity to partner with us.
                            Fill out the form below to get in touch with our team!
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-4 space-y-3">
                        <Input
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Input
                            placeholder="Service Type"
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        />
                        <Input
                            placeholder="Location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                        <Input
                            type="tel"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        />
                        <Button className="w-full mt-2 bg-blue-600 text-white" onClick={handleSubmit} disabled={isLoading?true:false}>
                            Submit
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
