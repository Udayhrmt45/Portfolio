import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    let folder = "portfolio";

    if (file.fieldname === "image") {
      folder = "portfolio/projects";
    }

    if (file.fieldname === "certificate_image") {
      folder = "portfolio/certifications";
    }

    if (file.fieldname === "document") {
      folder = "portfolio/certifications";
    }

    return {
      folder,
      allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"]
    };
  }
});

const upload = multer({ storage });

export default upload;