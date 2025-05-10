import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import { getCompetitions, getMatches } from "../services/api";
import type { Competition, Match } from "../types/football";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const Matches = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string>("");
  const [matches, setMatches] = useState<Match[]>([]);
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
          Matches
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          sx={{ maxWidth: "800px", mx: "auto", px: 2 }}
        >
          Track live matches and upcoming fixtures
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

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {matches.map((match) => (
          <Card
            key={match.id}
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 12px)",
                md: "1 1 calc(33.333% - 16px)",
              },
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition:
                "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  {match.homeTeam.name}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  {match.awayTeam.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                  py: 2,
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                  }}
                >
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
                  sx={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Matches;
