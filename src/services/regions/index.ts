"use server"

import { db } from "@/lib/db"

export const addRegion = async ({ region }: { region: string }) => {
    try {
        const data =await db.region.create({ data: { region } });
        return data;
    }catch (e) {
        throw new Error(e instanceof Error ? e.message : "Internal Server Error");
    }
}

export const allRegion = async () => {
    try {
        const data =await db.region.findMany();        
        return data;
    } catch (e) {
        throw new Error(e instanceof Error ? e.message : "Internal Server Error");
    }
}   

export const deleteRegion=async({id}:{id:number})=>{
    try{
        const data=await db.region.delete({where:{id}});
        return data;
    }catch(e){
        throw new Error(e instanceof Error ? e.message : "Internal Server Error");
    }
}