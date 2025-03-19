"use server"
import { revalidateTag } from "next/cache";

export const revalidate = async () => {
    try {
        revalidateTag("serviceProviders");
        revalidateTag("products");
        return true;
    } catch (e) {
        return false;
    }

}