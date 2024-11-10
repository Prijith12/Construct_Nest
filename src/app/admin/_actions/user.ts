"use server"

import { db } from "@/lib/db";

export async function allUsers(){
    const users=await db.user.findMany();
    return users;
}