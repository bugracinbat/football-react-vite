import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { getCompetitions, getTeams } from "../services/api";
import type { Competition, Team } from "../types/football";

const Teams = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string>("");
  const [teams, setTeams] = useState<Team[]>([]);

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
    const fetchTeams = async () => {
      if (selectedCompetition) {
        try {
          const response = await getTeams(selectedCompetition);
          setTeams(response.data.teams);
        } catch (error) {
          console.error("Error fetching teams:", error);
        }
      }
    };

    fetchTeams();
  }, [selectedCompetition]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Teams
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
        {teams.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={team.crest}
                alt={team.name}
                sx={{ objectFit: "contain", p: 2 }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {team.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Founded: {team.founded}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Venue: {team.venue}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Colors: {team.clubColors}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Teams;
