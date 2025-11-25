import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Divider, CircularProgress, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getConsultaById } from "../services/consultaService";
import type { Consulta } from "../types/consulta";

const formatarDataHora = (iso?: string | null) => {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatarValorBR = (v?: number | null) => {
  if (v == null) return "-";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
};

const FichaConsultaPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await getConsultaById(Number(id));
        setConsulta(data);
      } catch (error) {
        console.error("Erro ao carregar consulta:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!consulta) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">Consulta não encontrada.</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }} variant="contained">
          Voltar
        </Button>
      </Box>
    );
  }

  const animal = consulta.Animal;
  const vet = consulta.Veterinario;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Paper sx={{ width: "100%", maxWidth: 900, p: 4, borderRadius: 3 }} elevation={4}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/consultas")}
          sx={{ mb: 2 }}
        >
          Voltar
        </Button>

        <Typography variant="h4" fontWeight={700} textAlign="center">
          Ficha da Consulta
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Dados do Animal */}
        <Typography variant="h5" fontWeight={600} gutterBottom>
          🐾 Dados do Animal
        </Typography>
        <Typography><strong>Nome:</strong> {animal?.nome ?? "-"}</Typography>
        <Typography><strong>Espécie:</strong> {animal?.especie ?? "-"}</Typography>
        <Typography><strong>Responsável:</strong> {animal?.responsavelNome ?? "-"}</Typography>
        <Typography><strong>Email do Responsável:</strong> {animal?.responsavelEmail ?? "-"}</Typography>
        <Typography><strong>Telefone do Responsável:</strong> {animal?.responsavelTelefone ?? "-"}</Typography>
        <Typography><strong>Raça:</strong> {animal?.raca ?? "-"}</Typography>
        <Typography><strong>Sexo:</strong> {animal?.sexo ?? "-"}</Typography>
        <Typography><strong>Idade:</strong> {animal?.idade ?? "-"}</Typography>
        <Typography><strong>Observações:</strong> {animal?.observacoes ?? "-"}</Typography>

        <Divider sx={{ my: 3 }} />

        {/* Dados do Veterinário */}
        <Typography variant="h5" fontWeight={600} gutterBottom>
          🩺 Veterinário Responsável
        </Typography>
        <Typography><strong>Nome:</strong> {vet?.nome ?? "-"}</Typography>
        <Typography><strong>Especialidade:</strong> {vet?.especialidade ?? "-"}</Typography>
        <Typography><strong>CRMV:</strong> {vet?.crmv ?? "-"}</Typography>
        <Typography><strong>Telefone (se houver):</strong> {vet?.telefone ?? "-"}</Typography>

        <Divider sx={{ my: 3 }} />

        {/* Dados da Consulta */}
        <Typography variant="h5" fontWeight={600} gutterBottom>
          📋 Informações da Consulta
        </Typography>
        <Typography><strong>Data e Hora:</strong> {formatarDataHora(consulta.dataHora)}</Typography>
        <Typography><strong>Status:</strong> {consulta.status}</Typography>
        <Typography><strong>Motivo:</strong> {consulta.motivo ?? "-"}</Typography>
        <Typography><strong>Anotações:</strong> {consulta.anotacoes ?? "-"}</Typography>
        <Typography><strong>Valor:</strong> {formatarValorBR(consulta.valor)}</Typography>

        <Divider sx={{ my: 3 }} />

        <Box textAlign="center">
          <Button variant="contained" onClick={() => window.print()}>
            Imprimir Ficha
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FichaConsultaPage;
