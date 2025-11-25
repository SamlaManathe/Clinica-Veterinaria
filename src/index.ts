import express from "express";
import dotenv from "dotenv";
import consultaRoutes from "./routes/consultaRoutes";
import dentistaRoutes from "./routes/dentistaRoutes";
import pacienteRoutes from "./routes/pacienteRoutes";
import secretarioRoutes from "./routes/secretarioRoutes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/consultas", consultaRoutes);
app.use("/dentistas", dentistaRoutes);
app.use("/pacientes", pacienteRoutes);
app.use("/secretarios", secretarioRoutes);

setupSwagger(app);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Swagger disponível em http://localhost:${port}/api-docs`);
});