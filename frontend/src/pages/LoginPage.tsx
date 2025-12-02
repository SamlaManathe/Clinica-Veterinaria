import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { z } from "zod";
import axios from "axios";

import CriarSecretarioModal from "../components/secretarios/CriarSecretarioModal";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const emailSchema = z.email();
const passwordSchema = z.string().min(4);

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [msgSucesso, setMsgSucesso] = useState<string>("");
  const [msgErro, setMsgErro] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [openCadastro, setOpenCadastro] = useState(false);

  const validateEmail = (email: string) => {
    if (!email.trim()) return { isValid: false, message: "Email é obrigatório" };
    const res = emailSchema.safeParse(email);
    return { isValid: res.success, message: res.success ? "" : "Email inválido" };
  };

  const validatePassword = (password: string) => {
    if (!password.trim()) return { isValid: false, message: "Senha é obrigatória" };
    const res = passwordSchema.safeParse(password);
    return {
      isValid: res.success,
      message: res.success ? "" : "Senha com menos de 4 caracteres",
    };
  };

  const inputsValidos =
    validateEmail(email).isValid && validatePassword(password).isValid;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = `${API_BASE}/secretarios/login`;

    setIsLoading(true);

    try {
      const response = await axios.post(url, {
        email: email,
        senha: password,
      });

      const dadosSecretario = response.data;

      setMsgSucesso(`Bem vindo(a), ${dadosSecretario.secretario.nome}!`);
      setMsgErro("");

      setTimeout(() => {
        navigate("/home");
      }, 1200);
    } catch (error: any) {
      let msg = "Erro ao realizar login. Verifique suas credenciais.";
      if (error?.response?.data?.message) msg = error.response.data.message;

      setMsgErro(msg);
      setMsgSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CriarSecretarioModal
        open={openCadastro}
        onClose={() => setOpenCadastro(false)}
        onSuccess={() => {
          setMsgSucesso("Cadastro realizado com sucesso!");
          setOpenCadastro(false);
        }}
      />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          background: "linear-gradient(135deg, #A5D6A7, #81C784)",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            p: 4,
            width: 360,
            borderRadius: 4,
            backgroundColor: "#ffffffee",
            backdropFilter: "blur(4px)",
          }}
        >
          <Box textAlign="center" mb={2}>
            <PetsIcon sx={{ fontSize: 50, color: "#388E3C", mb: 1 }} />

            <Typography variant="h5" fontWeight={700} color="primary.dark">
              Clínica PetCare
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Acesse sua conta
            </Typography>
          </Box>

          {msgSucesso && <Alert>{msgSucesso}</Alert>}
          {msgErro && <Alert severity="error">{msgErro}</Alert>}

          <Box component="form" noValidate onSubmit={handleSubmit}>

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!validateEmail(email).isValid}
              helperText={validateEmail(email).message}
              disabled={isLoading}
            />

            <TextField
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!validatePassword(password).isValid}
              helperText={validatePassword(password).message}
              disabled={isLoading}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#43A047",
                "&:hover": { backgroundColor: "#2E7D32" },
              }}
              disabled={!inputsValidos || isLoading}
            >
              {isLoading ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <CircularProgress size={20} color="inherit" />
                  Entrando...
                </Box>
              ) : (
                "Entrar"
              )}
            </Button>
          </Box>

          <Button
            fullWidth
            sx={{
              mt: 2,
              color: "#1B5E20",
              fontWeight: 600,
            }}
            onClick={() => setOpenCadastro(true)}
          >
            Criar conta
          </Button>
        </Paper>
      </Box>
    </>
  );
}

export default Login;
