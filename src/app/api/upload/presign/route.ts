import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSessionUser } from "@/features/auth/auth-server";

const s3Client = new S3Client({
  region: process.env.S3_REGION || "us-east-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET!;

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getServerSessionUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { filename, contentType } = await request.json();
    console.log("Upload request:", { filename, contentType });

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "Filename and content type are required" },
        { status: 400 }
      );
    }

    // Validate file type (allow images and common document types for CV)
    const allowed =
      contentType.startsWith("image/") ||
      contentType === "application/pdf" ||
      contentType === "application/msword" ||
      contentType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    if (!allowed) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = filename.split(".").pop();
    const folder = contentType.startsWith("image/")
      ? "idevx/uploads/images"
      : "idevx/uploads/files";
    const uniqueFilename = `${folder}/${timestamp}-${randomString}.${fileExtension}`;

    console.log("Generated filename:", uniqueFilename);

    // Create presigned URL
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: uniqueFilename,
      ContentType: contentType,
      Metadata: {
        uploadedBy: user.id,
        originalName: filename,
      },
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // 1 hour
    });

    const fileUrl = `https://${BUCKET_NAME}.s3.${process.env.S3_REGION || "us-east-2"}.amazonaws.com/${uniqueFilename}`;

    console.log("Generated presigned URL and file URL:", { fileUrl });

    return NextResponse.json({
      presignedUrl,
      fileUrl,
      filename: uniqueFilename,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      {
        error: `Failed to generate presigned URL: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
