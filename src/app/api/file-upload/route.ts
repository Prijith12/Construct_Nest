import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const currentDate = new Date().toISOString().replace(/:/g, '-');
    const fileName = `${currentDate}.jpeg`;

    const blob = await put(fileName, buffer, {
      access: "public", 
      token: process.env.BLOB_READ_WRITE_TOKEN, 
    });

    return NextResponse.json({ message: "Success", fileName: blob.url }, { status: 201 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { message: "Failed", error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
};
