"use client"
import { CircleArrowUp, Instagram, Facebook } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import type { Regions } from "@/app/admin/manage-regions/_components/regions-table"
import { Spinner } from "./loading/Loading"
import { allRegionsQuery } from "@/app/admin/manage-regions/_components/regions-table"


export default function Footer({ children }: { children: React.ReactNode }) {

    const { data: regions, isLoading } = useQuery({ queryKey: ['regions'], queryFn: allRegionsQuery });
    
    const socilMediaLinks: SocialMediaProps[] = [
        { link: 'https://www.instagram.com/prijith_t/?hl=en', Icon: Instagram, color: "text-red-600", label: 'Instagram' },
        { link: '/error', Icon: Facebook, color: "text-blue-900", label: 'Facebook' }
    ];

    const partners=['Contractors','Material Suppliers'];

    return (
        <div className="w-full min-h-32 bottom-0 bg-gray-600 font-serif mt-24 md:mt-32">
            <div className="px-4 py-7">
                <div className="flex justify-between border-b-2 border-gray-500 min-h-20">
                    <div className="w-1/2 text-base md:text-lg  font-medium text-gray-100 mb-3 ">
                        Construct Nest provides all services to help build houses easily and faster
                        <div className="pt-3 w-1/2">
                            <Accordion type="single" collapsible >
                                <AccordionItem value="1" className="border-none">
                                    <AccordionTrigger className="text-xs md:text-sm font-bold">View Current Regions</AccordionTrigger>
                                   {
                                    isLoading? <Spinner/> : 
                                    regions?.map((regionsData:Regions)=>(
                                        <AccordionContent key={regionsData.id} className="text-xs">
                                        {regionsData?.region}
                                    </AccordionContent>
                                    ))
                                    }
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => window.scrollTo({ top: 0 })}><CircleArrowUp className="size-9 md:size-12 text-gray-300 hover:scale-110" /></button>
                    </div>
                </div>
                <div className="pt-3 grid grid-cols-2 md:grid-cols-3 text-gray-100">
                    <div>
                        {children}
                    </div>
                    <div>
                        <h1 className="pb-3 text-sm md:text-base font-semibold">Connect With As</h1>
                        {socilMediaLinks.map((data, index) => (
                            <SocialMedia {...data} key={index} />
                        ))}

                    </div>
                    <div className="pt-4 md:pt-0">
                        <h1 className="pb-2 text-sm md:text-base font-semibold">Our Partners</h1>
                        <div>
                            {
                                partners.map((partner,index)=>(
                                    <h1 className="pb-1 text-xs md:text-sm" key={index}>{partner}</h1>
                                ))
                            }
                        
                        </div>
                    </div>
                </div>
                <div className="pt-7 flex text-gray-100 text-xs">
                © 2024 Construct Nest. All rights reserved. Building dreams with quality and care.
                </div>
            </div>
        </div>
    )
}

const SocialMedia = ({ link, Icon, label, color }: SocialMediaProps) => {
    return (
        <Link href={link} className="flex  group text-sm pb-1">
            <Icon className={`size-4 group-hover:${color} group-hover:size-5`} />
            <span className=" pl-1 group-hover:underline">{label}</span>
        </Link>
    )
}


type SocialMediaProps = {
    link: string
    Icon: React.ElementType
    label: string
    color: 'text-red-600' | 'text-blue-900' | 'text-blue-500'
}

