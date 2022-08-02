import fs from "fs";
import path from "path";

export const createFolder = (folderName: string) => {
    fs.access(folderName, (error) => {
        // To check if the given directory 
        // already exists or not
        if(error) {
            // If current directory does not exist
            // then create it
            fs.mkdir(path.join(__dirname, "../../public/media/images/moreimages", folderName), (error) => {
                if (error) {
                    // console.log(error);
                    return {
                        status: false,
                        message: "Ocorreu um erro",
                        realError: error,
                    }
                } else {
                    // console.log("New Directory created successfully!");
                    return {
                        status: true,
                        message: "New Directory created successfully!",
                    }
                }
            });
        } else {
            // console.log("Given Directory already exists!");
            return {
                status: false,
                message: "Given Directory already exists!",
            }
        }
    });
}