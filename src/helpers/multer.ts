import multer from "multer";

const upload = multer({
    dest: "./tmp",
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ["image/jpg", "image/jpeg", "image/png"];
        cb(null, allowed.includes(file.mimetype))
    },
    limits: { fieldSize: 2000000 }
});

export default upload;