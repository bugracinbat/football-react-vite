import { useState, useEffect } from "react";
import {
  Typography,
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
  Box,
  useTheme,
} from "@mui/material";
import { getCompetitions, getScorers } from "../services/api";
import type { Competition, Scorer } from "../types/football";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const Statistics = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string>("");
  const [scorers, setScorers] = useState<Scorer[]>([]);
  const theme = useTheme();

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
    <Box>
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          background:
            "linear-gradient(45deg, rgba(0,112,243,0.1), rgba(121,40,202,0.1))",
          py: 6,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 800,
            background: "linear-gradient(45deg, #0070f3, #7928ca)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          Statistics
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          sx={{ maxWidth: "800px", mx: "auto", px: 2 }}
        >
          Track player performance and competition statistics
        </Typography>
      </Box>

      <FormControl
        fullWidth
        sx={{
          mb: 4,
          "& .MuiOutlinedInput-root": {
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.08)",
            },
          },
        }}
      >
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

      <Card
        sx={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <TrendingUpIcon color="primary" />
            Top Scorers
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    Player
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    Team
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    Goals
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    Assists
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scorers.map((scorer) => (
                  <TableRow
                    key={scorer.player.id}
                    sx={{
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.03)",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {scorer.player.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {scorer.team.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {scorer.goals}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {scorer.assists}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Statistics;
