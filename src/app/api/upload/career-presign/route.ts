import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
    const { filename, contentType } = await request.json();
    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "Filename and content type are required" },
        { status: 400 }
      );
    }

    // Allow CV document types and images
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

    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const ext = filename.split(".").pop();
    const folder = contentType.startsWith("image/")
      ? "idevx/uploads/images"
      : "idevx/uploads/careers";
    const key = `${folder}/${timestamp}-${randomString}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
      Metadata: {
        originalName: filename,
        usage: "career-cv",
      },
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    const fileUrl = `https://${BUCKET_NAME}.s3.${process.env.S3_REGION || "us-east-2"}.amazonaws.com/${key}`;

    return NextResponse.json({ presignedUrl, fileUrl, filename: key });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to generate presigned URL: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
