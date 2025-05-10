import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Matches from "./pages/Matches";
import Statistics from "./pages/Statistics";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0070f3",
    },
    secondary: {
      main: "#7928ca",
    },
    background: {
      default: "#000000",
      paper: "#111111",
    },
    text: {
      primary: "#ffffff",
      secondary: "#888888",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "8px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            minHeight: "100vh",
            background: "linear-gradient(to bottom right, #000000, #111111)",
          }}
        >
          <Navbar />
          <Box
            component="main"
            sx={{
              maxWidth: "1200px",
              mx: "auto",
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 3, sm: 4, md: 5 },
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
