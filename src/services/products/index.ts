"use server"
import { db } from "@/lib/db";
import type { Product } from "@/app/admin/manage-products/page";


export const allProducts = async () => {
    try {
        const data = await db.product.findMany();
        return data;
    } catch (e) {
        throw new Error(e instanceof Error ? e.message : "Internal Server Error");
    }
}

export const addProduct = async (product: Product) => {
    try {
        const data = await db.product.create({ data: product });
        return data;

    } catch (e) {
        throw new Error(e instanceof Error ? e.message : "Internal Server Error");
    }
}

export const deleteProduct = async ({ productId }: { productId: number }) => {
    try {
        const data = await db.product.delete({ where: { productId } });
        return data;
    } catch (e) {
        throw new Error(e instanceof Error ? e.message : "Internal Server Error");
    }

}