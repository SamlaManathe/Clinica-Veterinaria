import React, { useEffect, useState, useMemo } from "react";
import type { Secretario } from "../types/secretario";
import {
  getSecretarios,
  deleteSecretario,
} from "../services/secretarioService";
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
import SecretariosTable from "../components/secretarios/SecretariosTable";
import CriarSecretarioModal from "../components/secretarios/CriarSecretarioModal";
import EditarSecretarioModal from "../components/secretarios/EditarSecretarioModal";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const SecretariosPage: React.FC = () => {
  const navigate = useNavigate();

  const [secretarios, setSecretarios] = useState<Secretario[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });
  const [secretarioEditando, setSecretarioEditando] = useState<Secretario | null>(null);
  const [criarModalOpen, setCriarModalOpen] = useState(false);

  const [busca, setBusca] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getSecretarios();
        setSecretarios(data);
      } catch (e) {
        setSnackbar({
          open: true,
          message: "Erro ao buscar secretários.",
          severity: "error",
        });
        console.error(e);
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteSecretario(id);
      setSecretarios((prev) => prev.filter((s) => s.id !== id));
      setSnackbar({
        open: true,
        message: "Secretário removido com sucesso.",
        severity: "success",
      });
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Erro ao deletar secretário.",
        severity: "error",
      });
      console.error(e);
    } finally {
      setDeletingId(null);
    }
  };

  const secretariosFiltrados = useMemo(() => {
    return secretarios.filter(s =>
      s.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [busca, secretarios]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" p={3}>
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 1000, p: 3, position: "relative", borderRadius: 2 }}>
        
        <IconButton aria-label="voltar" onClick={() => navigate("/home")} size="small" sx={{ position: "absolute", left: 16, top: 16 }}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
          Lista de Secretários
        </Typography>

        <TextField
          label="Buscar por nome"
          fullWidth
          margin="normal"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <SecretariosTable
          secretarios={secretariosFiltrados}
          deletingId={deletingId}
          onDelete={handleDelete}
          onEdit={(s) => setSecretarioEditando(s)}
        />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={() => setCriarModalOpen(true)}>
            Novo Secretário
          </Button>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={() => setSnackbar((s) => ({ ...s, open: false }))} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>

      <CriarSecretarioModal
        open={criarModalOpen}
        onClose={() => setCriarModalOpen(false)}
        onSuccess={(novo) => {
          setSecretarios((prev) => [...prev, novo]);
          setSnackbar({ open: true, message: "Secretário criado com sucesso.", severity: "success" });
        }}
      />

      <EditarSecretarioModal
        open={secretarioEditando !== null}
        secretario={secretarioEditando}
        onClose={() => setSecretarioEditando(null)}
        onSave={(sec) => {
          setSecretarios((prev) => prev.map((s) => s.id === sec.id ? sec : s));
          setSnackbar({ open: true, message: "Secretário atualizado com sucesso.", severity: "success" });
        }}
      />
    </Box>
  );
};

export default SecretariosPage;
