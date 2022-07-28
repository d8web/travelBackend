import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import path from "path";
import http from "http";
import cors from "cors";
import routes from "../routes";
import dotenv from "dotenv";

dotenv.config();

import { Server } from "socket.io";

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "/../../", "public")));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
        status: "Error",
        message: error.message
    });
});

const serverHttp = http.createServer(app);

const io = new Server(serverHttp); // If necessary, add a second parameter inside the new Server, example: {cors: "*"}

export { serverHttp, io };