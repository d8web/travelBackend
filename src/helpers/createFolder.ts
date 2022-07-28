import fs from "fs";
import path from "path";
// const path = "./new-Directory"; path example

export const createFolder = (folderName: string) => {
    fs.access(folderName, (error) => {
        // To check if the given directory 
        // already exists or not
        if (error) {
            // If current directory does not exist
            // then create it
            fs.mkdir(path.join(__dirname, "../../public/media/images/moreimages", folderName), (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("New Directory created successfully!");
                }
            });
        } else {
            console.log("Given Directory already exists!");
        }
    });
}