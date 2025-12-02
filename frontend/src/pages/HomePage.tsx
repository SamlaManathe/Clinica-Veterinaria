import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "linear-gradient(135deg, #81C784, #A5D6A7)",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 360,
          borderRadius: 4,
          backgroundColor: "#ffffffee",
          backdropFilter: "blur(4px)",
        }}
      >
        <Box textAlign="center" mb={3}>
          <PetsIcon sx={{ fontSize: 70, color: "#2E7D32" }} />
          <Typography variant="h5" fontWeight={700} mt={1}>
            Painel da Clínica PetCare
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: "#43A047",
            "&:hover": { backgroundColor: "#2E7D32" },
          }}
          onClick={() => navigate("/animais")}
        >
          Animais
        </Button>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: "#66BB6A",
            "&:hover": { backgroundColor: "#43A047" },
          }}
          onClick={() => navigate("/veterinarios")}
        >
          Veterinários
        </Button>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: "#81C784",
            "&:hover": { backgroundColor: "#66BB6A" },
          }}
          onClick={() => navigate("/secretarios")}
        >
          Secretários
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderColor: "#1B5E20",
            color: "#1B5E20",
            fontWeight: 600,
            "&:hover": {
              borderColor: "#1B5E20",
              backgroundColor: "#E8F5E9",
            },
          }}
          onClick={() => navigate("/consultas")}
        >
          Consultas
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;
