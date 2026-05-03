import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Tooltip,
  alpha,
} from "@mui/material";
import { 
  Email, 
  Lock, 
  Verified, 
  Security,
} from "@mui/icons-material";
import fondo from "../assets/images/fondo_aerocentro.png";
import logo from "../assets/images/aerocentro_corto.png";

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let temp = {};
    if (!form.email) {
      temp.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      temp.email = "Correo inválido";
    }
    if (!form.password) {
      temp.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      temp.password = "Mínimo 6 caracteres";
    }
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Login correcto", form);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        position: "relative",
      }}
    >
      {/* capa oscura */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.55)",
        }}
      />

      <Paper
        elevation={6}
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 380,
          borderRadius: 3,
          p: 3,
          backdropFilter: "blur(10px)",
          bgcolor: '#fff',
        }}
      >
        {/* Logo y título */}
        <Box sx={{ textAlign: "center" }}>
        <Box
            component="img"
            src={logo}
            alt="Logo Aerocentro"
            sx={{
            width: 18/0,
            height: 80,
            maxHeight: 100,
            objectFit: "fill",
            bgcolor: "white",
            borderRadius: 2,
            p: 1,
            }}
        />
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Correo electrónico"
            name="email"
            type="email"
            size="small"
            margin="dense"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            size="small"
            margin="dense"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="small"
            sx={{
              mt: 2,
              py: 1,
              borderRadius: 2,
              fontWeight: "bold",
              fontSize: "0.8rem",
              background: "#220057",
              "&:hover": {
                background: "#1d014b",
              },
            }}
          >
            INICIAR SESIÓN
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 1.5, cursor: "pointer", color: "#e5143a", fontSize: "0.8rem" }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        </form>

        {/* Indicadores de seguridad */}
        <Box
          sx={{
            mt: 2,
            pt: 1.5,
            borderTop: `1px solid ${alpha("#000000", 0.1)}`,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Tooltip title="Cifrado TLS 1.3">
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Security sx={{ fontSize: 12, color: "#4caf50" }} />
              <Typography variant="caption" sx={{ fontSize: "0.6rem", color: "text.secondary" }}>
                TLS 1.3
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Acceso seguro y auditado">
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Verified sx={{ fontSize: 12, color: "#2196f3" }} />
              <Typography variant="caption" sx={{ fontSize: "0.6rem", color: "text.secondary" }}>
                Auditado
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Conexión segura">
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#4caf50",
                  boxShadow: "0 0 4px #4caf50",
                }}
              />
              <Typography variant="caption" sx={{ fontSize: "0.6rem", color: "text.secondary" }}>
                Seguro
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
};