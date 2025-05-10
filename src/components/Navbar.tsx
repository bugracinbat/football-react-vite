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
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 } }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <SportsSoccerIcon
              sx={{
                mr: 1.5,
                color: theme.palette.primary.main,
                fontSize: "2rem",
              }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #0070f3, #7928ca)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Football Stats
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {[
              { path: "/", label: "Home" },
              { path: "/teams", label: "Teams" },
              { path: "/matches", label: "Matches" },
              { path: "/statistics", label: "Statistics" },
            ].map((item) => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                sx={{
                  color: isActive(item.path)
                    ? theme.palette.primary.main
                    : "inherit",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: isActive(item.path)
                      ? "translateX(-50%)"
                      : "translateX(-50%) scaleX(0)",
                    width: "100%",
                    height: "2px",
                    backgroundColor: theme.palette.primary.main,
                    transition: "transform 0.2s ease-in-out",
                  },
                  "&:hover::after": {
                    transform: "translateX(-50%) scaleX(1)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
