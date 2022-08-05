import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import path from "path";
import http from "http";
import cors from "cors";
import routes from "../routes/index";
import dotenv from "dotenv";

dotenv.config();

import { Server } from "socket.io";

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "/../../", "public")));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/accommodations", routes.AccommodationRoutes);
app.use("/api/conversations", routes.ConversationsRoutes);
app.use("/api/attractives", routes.AttractivesRoutes);
app.use("/api/agencies", routes.AgenciesRoutes);
app.use("/api/business", routes.BusinessRoutes);
app.use("/api/messages", routes.MessagesRoutes);
app.use("/api/tours", routes.ToursRoutes);
app.use("/api/parks", routes.ParksRoutes);
app.use("/api/posts", routes.PostsRoutes);
app.use("/api/users", routes.UserRoutes);
app.use("/api/auth", routes.AuthRoutes);
app.use("/api/feed", routes.FeedRoutes);
app.use("/api/food", routes.FoodRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    return res.json({
        status: "Error",
        message: error.message
    });
});

const serverHttp = http.createServer(app);

const io = new Server(serverHttp); // If necessary, add a second parameter inside the new Server, example: {cors: "*"}

export { serverHttp, io };