"use server"

import { db } from "@/lib/db"
import type { Providers } from "@/app/admin/service-providers/_components/providers-table"


type Provider = Omit<Providers, 'id'> & { id?: number }

export const addServiceProvider = async (provider: Provider) => {
    try {
        const data = await db.serviceProvider.create({ data: provider });
        return data;

    } catch (err) {

        throw new Error(err instanceof Error ? err.message : "Internal server Error")
    }
}

export const allServiceProviders = async () => {
    try {
        const data = await db.serviceProvider.findMany();
        return data;
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : "Internal Server Error");
    }
}

export const deleteServiceProvider = async ({ id }: { id: number }) => {
    try {
        const data = await db.serviceProvider.delete({ where: { id } });
        return data;
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : "Internal Server Errror")
    }
}