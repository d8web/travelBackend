// import express, { Request, Response, NextFunction } from "express";
// import "express-async-errors";
// import path from "path";
// import routes from "./routes";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();

// app.use(express.static(path.join(__dirname, "../public")));
// app.use(express.json());

// app.use(routes);

// app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
//     return response.json({
//         status: "Error",
//         message: error.message
//     });
// });

// app.listen(process.env.PORT, () => {
//     console.log(`Servidor rodando na porta: ${process.env.PORT}`
// )});