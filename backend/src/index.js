import "dotenv/config";
import cors from "cors";
import express from "express";
import todosRouter from "./routes/todos.js";

const app = express();
const PORT = process.env.PORT || 4000;
// const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

// app.use(
//   cors({
//     origin: CORS_ORIGIN,
//   })
// );
app.use(express.json());

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : [];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
  
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
  
        return callback(new Error("Not allowed by CORS"));
      },
    })
  );

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/todos", todosRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
