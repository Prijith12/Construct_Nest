import { NextRequest, NextResponse } from "next/server"
import { addRegion, allRegion, deleteRegion } from "@/services/regions";

export const POST = async (req: NextRequest) => {
    const region = await req.json()
    const response = await addRegion(region);

    if (!response.success) {
        return NextResponse.json(response, { status: 500 });
    }

    return NextResponse.json(response, { status: 201 });


}

export const GET = async () => {
    const response = await allRegion();
    if (!response.success) {
        return NextResponse.json(response, { status: 500 });
    }

    return NextResponse.json(response);
}

export const DELETE = async (req: NextRequest) => {
    const { id } = await req.json();
    const response = await deleteRegion({ id });
    if (!response.success) {
        return NextResponse.json(response, { status: 500 });
    }

    return NextResponse.json(response);
}
