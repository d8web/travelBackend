import sharp from "sharp";
import { unlink } from "fs/promises";

// Function received file image and path and folder special optional
export const resizeAndReturnImage = async (f: Express.Multer.File, path: string, folder?: string) => {
    // Get the name from image
    const fileName = `${f.filename}.jpg`;

    // Manipulation image with library sharp
    if(folder) {
        await sharp(f.path)
            .resize(1000)
            .toFormat("jpeg")
            .toFile(`./public/media/images/${path}/${folder}/${fileName}`);
        } else {
        await sharp(f.path)
            .resize(1000)
            .toFormat("jpeg")
            .toFile(`./public/media/images/${path}/${fileName}`);
    }

    // Delete file temporary tmp
    await unlink(f.path);

    // Return image name
    return fileName;
}