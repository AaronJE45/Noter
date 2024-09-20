import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import noteRoutes from "./routes/notes";

const app = express();

app.use(express.json());

app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
  next(Error("Not Found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  let errorMessage = "An error occurred, something went wrong.";
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  res.status(500).json({ message: errorMessage });
});

export default app;
