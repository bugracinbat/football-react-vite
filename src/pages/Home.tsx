import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getCompetitions } from "../services/api";
import type { Competition } from "../types/football";

const Home = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await getCompetitions();
        setCompetitions(response.data.competitions);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to Football Stats
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        align="center"
        color="text.secondary"
      >
        Your one-stop destination for football statistics and information
      </Typography>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Featured Competitions
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {competitions.slice(0, 5).map((competition) => (
                <Typography key={competition.id}>{competition.name}</Typography>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography>• View team rosters and player statistics</Typography>
              <Typography>• Check upcoming matches and results</Typography>
              <Typography>• Explore top scorers and assists</Typography>
              <Typography>• Track team standings and performance</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
