import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import multer from "multer";

import * as UserController from "./controllers/UserController";
import * as RefreshTokenController from "./controllers/RefreshTokenController";
import * as AttractiveController from "./controllers/AttractiveController";
import * as ParkController from "./controllers/ParkController";
import * as AgencyController from "./controllers/AgencyController";
import * as TourController from "./controllers/TourController";

const upload = multer({
    dest: "./tmp",
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ["image/jpg", "image/jpeg", "image/png"];
        cb(null, allowed.includes(file.mimetype))
    },
    limits: { fieldSize: 2000000 }
});

const routes = Router();

routes.get("/ping", (request: Request, response: Response) => {
    response.json({pong: true});
});

routes.post("/auth/create", UserController.Create);
routes.post("/auth/login", UserController.AuthUser);
routes.post("/auth/refresh", RefreshTokenController.Refresh);

routes.get("/attractives", AttractiveController.All);
routes.post("/attractive", AttractiveController.NewAttractive);

routes.get("/courses", ensureAuthenticated, (request: Request, response: Response) => {
    response.json([
        { id: 1, name: "Nodejs" },
        { id: 3, name: "React" },
        { id: 4, name: "Javascript" },
        { id: 5, name: "Prisma" },
        { id: 2, name: "Laravel" },
    ]);
});

routes.post("/upload", upload.single("image"), AttractiveController.NewAttractive);

routes.post("/images",  upload.fields([
    {name: "cover", maxCount: 1},
    {name: "images", maxCount: 4}
]), AttractiveController.AddImages);

routes.get("/parks", ParkController.AllParks);
routes.post("/park", upload.single("image"), ParkController.Create);

routes.post("/agency", upload.single("image"), AgencyController.CreateAgency);
routes.get("/agencies", AgencyController.AllAgencies);

routes.get("/tours", TourController.AllTours);
routes.post("/tour", upload.single("image"), TourController.Create);

export default routes;