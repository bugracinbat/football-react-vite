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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getCompetitions, getScorers } from "../services/api";
import type { Competition, Scorer } from "../types/football";

const Statistics = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string>("");
  const [scorers, setScorers] = useState<Scorer[]>([]);

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
    const fetchScorers = async () => {
      if (selectedCompetition) {
        try {
          const response = await getScorers(selectedCompetition);
          setScorers(response.data.scorers);
        } catch (error) {
          console.error("Error fetching scorers:", error);
        }
      }
    };

    fetchScorers();
  }, [selectedCompetition]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Statistics
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
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Scorers
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Player</TableCell>
                      <TableCell>Team</TableCell>
                      <TableCell align="right">Goals</TableCell>
                      <TableCell align="right">Assists</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scorers.map((scorer) => (
                      <TableRow key={scorer.player.id}>
                        <TableCell>{scorer.player.name}</TableCell>
                        <TableCell>{scorer.team.name}</TableCell>
                        <TableCell align="right">{scorer.goals}</TableCell>
                        <TableCell align="right">{scorer.assists}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Statistics;
