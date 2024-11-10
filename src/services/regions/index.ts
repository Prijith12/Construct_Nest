"use server"

import { db } from "@/lib/db"

export const addRegion = async ({ region }: { region: string }) => {
    try {
        const data =await db.region.create({ data: { region } });
        return { success: true, data }
    }catch (err) {
        return {success:false,message:err}
    }
}

export const allRegion = async () => {
    try {
        const data =await db.region.findMany();
        return { success: true, data }
    } catch (err) {
        return {success:false,message:err}
    }
}   

export const deleteRegion=async({id}:{id:number})=>{
    try{
        const data=await db.region.delete({where:{id}});
        return ({success:true,data});
    }catch(err){
        return({success:false,message:err})
    }
}