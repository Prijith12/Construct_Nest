"use server"

import { redirect } from "next/navigation"
import { baseUrl } from "./utils"

type apiProps = {
    url: string
    method?: 'GET' | 'POST' | 'DELETE'
    body?: {}
}

export const apiRequest = async ({ url, method = 'GET', body }: apiProps) => {
    try{
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
    
        const response = await fetch(`${baseUrl}${url}`,
            {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined
            });
        const data = await response.json()
        if (!response.ok) return redirect(`/error/${data.message?data.message:undefined}`)
        return data;

    }catch(e){
        throw new Error(e instanceof Error ? e.message : "Server Error");
    }

}