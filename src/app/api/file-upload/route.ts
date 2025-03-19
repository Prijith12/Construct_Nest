import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate unique filename
    const currentDate = new Date().toISOString().replace(/:/g, '-');
    const fileName = `${currentDate}.jpeg`;

    // Upload file to Vercel Blob Storage
    const blob = await put(fileName, buffer, {
      access: "public", // Make file publicly accessible
      token: process.env.BLOB_READ_WRITE_TOKEN, // Explicitly provide the token
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
