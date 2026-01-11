import cloudinary from "../config/cloud.js";

export const uploadFile = async (file, folder_name) => {
  if (!file || !file.buffer) return null;

  try {
    // Upload PDF
    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      {
        folder: folder_name,
        resource_type: "raw", // force raw pour PDF
        use_filename: true,
        unique_filename: true,
        type: "upload",
      }
    );

    // 🔹 URL publique téléchargeable
    const downloadUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/fl_attachment/${result.public_id}`;

    console.log("PDF Cloudinary URL:", downloadUrl);

    return downloadUrl;

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
