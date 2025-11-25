import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import consultaRoutes from "./routes/consultaRoutes";
import veterinarioRoutes from "./routes/veterinarioRoutes";
import animalRoutes from "./routes/animalRoutes";
import secretarioRoutes from "./routes/secretarioRoutes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

const port = process.env.PORT || 3000;

app.use(express.json());

// Rotas principais
app.use("/consultas", consultaRoutes);
app.use("/veterinarios", veterinarioRoutes);
app.use("/animais", animalRoutes);
app.use("/secretarios", secretarioRoutes);

// Swagger
setupSwagger(app);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`🐾 Servidor rodando em http://localhost:${port}`);
  console.log(`📘 Swagger disponível em http://localhost:${port}/api-docs`);
});