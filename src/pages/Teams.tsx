import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  useTheme,
} from "@mui/material";
import { getCompetitions, getTeams } from "../services/api";
import type { Competition, Team } from "../types/football";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const Teams = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string>("");
  const [teams, setTeams] = useState<Team[]>([]);
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
          Teams
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          sx={{ maxWidth: "800px", mx: "auto", px: 2 }}
        >
          Explore teams from various competitions and leagues
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
        {teams.map((team) => (
          <Card
            key={team.id}
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
            <CardMedia
              component="img"
              height="140"
              image={team.crest}
              alt={team.name}
              sx={{
                objectFit: "contain",
                p: 2,
                background: "rgba(255, 255, 255, 0.03)",
              }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {team.name}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Founded: {team.founded}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Venue: {team.venue}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Colors: {team.clubColors}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Teams;
