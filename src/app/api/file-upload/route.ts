import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile,mkdir } from "fs/promises";
import { existsSync } from "fs";


export const POST = async (req:NextRequest) => {
  const formData = await req.formData();
  

  const file = formData.get("file");
  if (!file||!(file instanceof File)) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const currentDate = new Date().toISOString().replace(/:/g, '-');
  const fileName=currentDate+'.jpeg'
  const uploadDir = path.join(process.cwd(), "public");

  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }
  try {
    await writeFile(
      path.join(path.join(uploadDir, fileName)),
      buffer as unknown as Uint8Array
    );
    return NextResponse.json({ Message: "Success", fileName,status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
