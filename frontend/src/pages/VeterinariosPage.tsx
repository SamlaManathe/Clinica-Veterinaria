import React, { useEffect, useState, useMemo } from "react";
import type { Veterinario } from "../types/veterinario";
import { getVeterinarios, deleteVeterinario } from "../services/veterinarioService";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import VeterinariosTable from "../components/veterinarios/VeterinariosTable";
import EditarVeterinarioModal from "../components/veterinarios/EditarVeterinarioModal";
import CriarVeterinarioModal from "../components/veterinarios/CriarVeterinarioModal";

type SnackbarState = { open: boolean; message: string; severity: "success" | "error" | "info" | "warning"; };

const VeterinariosPage: React.FC = () => {
  const navigate = useNavigate();
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: "", severity: "info" });
  const [veterinarioEditando, setVeterinarioEditando] = useState<Veterinario | null>(null);
  const [criarModalOpen, setCriarModalOpen] = useState(false);

  const [busca, setBusca] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getVeterinarios();
        setVeterinarios(data);
      } catch (e) {
        console.error(e);
        setSnackbar({ open: true, message: "Erro ao buscar veterinários.", severity: "error" });
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteVeterinario(id);
      setVeterinarios((prev) => prev.filter((v) => v.id !== id));
      setSnackbar({ open: true, message: "Veterinário removido com sucesso.", severity: "success" });
    } catch (e) {
      console.error(e);
      setSnackbar({ open: true, message: "Erro ao deletar veterinário.", severity: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  const veterinariosFiltrados = useMemo(() => {
    return veterinarios.filter(v =>
      v.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [busca, veterinarios]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" p={3}>
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 1000, p: 3, position: "relative", borderRadius: 2 }}>
        
        <IconButton aria-label="voltar" onClick={() => navigate("/home")} size="small" sx={{ position: "absolute", left: 16, top: 16 }}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
          Lista de Veterinários
        </Typography>

        {/* Campo de Filtro */}
        <TextField
          label="Buscar por nome"
          variant="outlined"
          fullWidth
          margin="normal"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <VeterinariosTable
          veterinarios={veterinariosFiltrados}
          deletingId={deletingId}
          onDelete={handleDelete}
          onEdit={(v) => setVeterinarioEditando(v)}
        />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={() => setCriarModalOpen(true)}>
            Novo Veterinário
          </Button>
        </Box>

        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert onClose={() => setSnackbar((s) => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>

      <EditarVeterinarioModal open={veterinarioEditando !== null} veterinario={veterinarioEditando} onClose={() => setVeterinarioEditando(null)} onSave={(vet) => {
        setVeterinarios((prev) => prev.map((v) => v.id === vet.id ? vet : v));
        setSnackbar({ open: true, message: "Veterinário atualizado com sucesso.", severity: "success" });
      }} />

      <CriarVeterinarioModal open={criarModalOpen} onClose={() => setCriarModalOpen(false)} onSuccess={(novo) => {
        setVeterinarios((prev) => [...prev, novo]);
        setSnackbar({ open: true, message: "Veterinário criado com sucesso.", severity: "success" });
      }} />
    </Box>
  );
};

export default VeterinariosPage;
