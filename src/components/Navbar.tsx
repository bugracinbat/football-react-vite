import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mr: 4,
          }}
        >
          <SportsSoccerIcon />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 700,
              background: "linear-gradient(45deg, #0070f3, #7928ca)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Football Pulse
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{
              "&:hover": {
                background: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/teams"
            color="inherit"
            sx={{
              "&:hover": {
                background: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            Teams
          </Button>
          <Button
            component={RouterLink}
            to="/matches"
            color="inherit"
            sx={{
              "&:hover": {
                background: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            Matches
          </Button>
          <Button
            component={RouterLink}
            to="/statistics"
            color="inherit"
            sx={{
              "&:hover": {
                background: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            Statistics
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
