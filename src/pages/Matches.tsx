import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Chip,
} from "@mui/material";
import { getCompetitions, getMatches } from "../services/api";
import type { Competition, Match } from "../types/football";

const Matches = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string>("");
  const [matches, setMatches] = useState<Match[]>([]);

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

  useEffect(() => {
    const fetchMatches = async () => {
      if (selectedCompetition) {
        try {
          const response = await getMatches(selectedCompetition);
          setMatches(response.data.matches);
        } catch (error) {
          console.error("Error fetching matches:", error);
        }
      }
    };

    fetchMatches();
  }, [selectedCompetition]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "finished":
        return "success";
      case "in_play":
        return "warning";
      case "scheduled":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Matches
      </Typography>

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Select Competition</InputLabel>
        <Select
          value={selectedCompetition}
          label="Select Competition"
          onChange={(e) => setSelectedCompetition(e.target.value)}
        >
          {competitions.map((competition) => (
            <MenuItem key={competition.id} value={competition.id.toString()}>
              {competition.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {matches.map((match) => (
          <Grid item xs={12} sm={6} md={4} key={match.id}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" component="div">
                    {match.homeTeam.name}
                  </Typography>
                  <Typography variant="h6" component="div">
                    {match.awayTeam.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h4" component="div">
                    {match.score.fullTime.home !== null &&
                    match.score.fullTime.away !== null
                      ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                      : "vs"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {new Date(match.utcDate).toLocaleDateString()}
                  </Typography>
                  <Chip
                    label={match.status}
                    color={getStatusColor(match.status) as any}
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Matches;
