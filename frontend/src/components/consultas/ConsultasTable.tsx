import React from "react";
import type { Consulta } from "../../types/consulta";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";

interface ConsultasTableProps {
  consultas: Consulta[];
  animais: { id: number; nome: string }[];
  veterinarios: { id: number; nome: string }[];
  deletingId: number | null;
  onDelete: (id: number) => void;
  onEdit: (consulta: Consulta) => void;
  loading?: boolean;
}

const ConsultasTable: React.FC<ConsultasTableProps> = ({
  consultas,
  animais,
  veterinarios,
  deletingId,
  onDelete,
  onEdit,
}) => {
  const navigate = useNavigate();

  return (
    <TableContainer className="mt-4 rounded-lg">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-800">
            {[
              "Animal",
              "Veterinário",
              "Data",
              "Status",
              "Motivo",
              "Ações",
            ].map((header) => (
              <TableCell
                key={header}
                align="center"
                className="font-bold text-white"
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {consultas.length === 0 ? (
            <TableRow>
              <TableCell
                align="center"
                colSpan={6}
                className="py-6 text-gray-500"
              >
                Nenhuma consulta encontrada.
              </TableCell>
            </TableRow>
          ) : (
            consultas.map((consulta) => {
              const animal = animais.find((a) => a.id === consulta.AnimalId);
              const vet = veterinarios.find(
                (v) => v.id === consulta.VeterinarioId
              );

              return (
                <TableRow key={consulta.id} hover>
                  <TableCell align="center">{animal?.nome}</TableCell>
                  <TableCell align="center">{vet?.nome}</TableCell>
                  <TableCell align="center">
                    {new Date(consulta.dataHora).toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell align="center">{consulta.status}</TableCell>
                  <TableCell align="center">{consulta.motivo || "-"}</TableCell>

                  <TableCell align="center">
                    <div className="flex justify-center gap-2">

                      {/* FICHA */}
                      <Tooltip title="Abrir ficha">
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() =>
                            navigate(`/consulta/${consulta.id}/ficha`)
                          }
                        >
                          <DescriptionIcon />
                        </IconButton>
                      </Tooltip>

                      {/* EDITAR */}
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => onEdit(consulta)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      {/* DELETAR */}
                      <Tooltip title="Excluir">
                        <IconButton
                          size="small"
                          color="error"
                          disabled={deletingId === consulta.id}
                          onClick={() => onDelete(consulta.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ConsultasTable;
