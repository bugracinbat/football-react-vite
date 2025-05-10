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
  useTheme,
  LinearProgress,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { getCompetitions, getScorers } from "../services/api";
import type { Competition, Scorer } from "../types/football";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { commonAnimationStyles } from "../utils/animations";

const Statistics = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string>("");
  const [scorers, setScorers] = useState<Scorer[]>([]);
  const [statType, setStatType] = useState<"goals" | "assists">("goals");
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
    const fetchTopScorers = async () => {
      if (selectedCompetition) {
        try {
          const response = await getScorers(selectedCompetition);
          setScorers(response.data.scorers);
        } catch (error) {
          console.error("Error fetching top scorers:", error);
        }
      }
    };

    fetchTopScorers();
  }, [selectedCompetition]);

  const getMaxValue = () => {
    return Math.max(
      ...scorers.map((scorer) =>
        statType === "goals" ? scorer.goals : scorer.assists
      )
    );
  };

  const getSortedScorers = () => {
    return [...scorers].sort((a, b) =>
      statType === "goals" ? b.goals - a.goals : b.assists - a.assists
    );
  };

  return (
    <Box sx={{ ...commonAnimationStyles.fadeIn }}>
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          py: 6,
          borderRadius: 4,
          ...commonAnimationStyles.gradient,
          background:
            "linear-gradient(45deg, rgba(0,112,243,0.1), rgba(121,40,202,0.1))",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 800,
            ...commonAnimationStyles.gradient,
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
          Track top performers and player statistics
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <FormControl
          fullWidth
          sx={{
            ...commonAnimationStyles.slideIn,
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

        <ToggleButtonGroup
          value={statType}
          exclusive
          onChange={(_, newValue) => newValue && setStatType(newValue)}
          sx={{
            ...commonAnimationStyles.slideIn,
            animationDelay: "0.1s",
            "& .MuiToggleButton-root": {
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "text.primary",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.08)",
              },
              "&.Mui-selected": {
                background: "rgba(0, 112, 243, 0.1)",
                color: "primary.main",
                "&:hover": {
                  background: "rgba(0, 112, 243, 0.15)",
                },
              },
            },
          }}
        >
          <ToggleButton value="goals">
            <SportsSoccerIcon sx={{ mr: 1 }} />
            Goals
          </ToggleButton>
          <ToggleButton value="assists">
            <EmojiEventsIcon sx={{ mr: 1 }} />
            Assists
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {getSortedScorers().map((scorer, index) => (
          <Card
            key={scorer.player.id}
            sx={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition:
                "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              animation: `${commonAnimationStyles.scaleIn.animation}`,
              animationDelay: `${index * 0.1}s`,
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                ...commonAnimationStyles.glow,
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 600,
                    ...commonAnimationStyles.gradient,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  {index + 1}. {scorer.player.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    ml: "auto",
                    ...commonAnimationStyles.pulse,
                  }}
                >
                  <EmojiEventsIcon
                    sx={{
                      color:
                        index === 0
                          ? "#FFD700"
                          : index === 1
                          ? "#C0C0C0"
                          : "#CD7F32",
                    }}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      ...commonAnimationStyles.gradient,
                    }}
                  >
                    {statType === "goals" ? scorer.goals : scorer.assists}{" "}
                    {statType}
                  </Typography>
                </Box>
              </Box>
              <Tooltip
                title={`${
                  ((statType === "goals" ? scorer.goals : scorer.assists) /
                    getMaxValue()) *
                  100
                }% of leader's ${statType}`}
              >
                <LinearProgress
                  variant="determinate"
                  value={
                    ((statType === "goals" ? scorer.goals : scorer.assists) /
                      getMaxValue()) *
                    100
                  }
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.1)",
                    "& .MuiLinearProgress-bar": {
                      background: "linear-gradient(45deg, #0070f3, #7928ca)",
                      borderRadius: 4,
                    },
                  }}
                />
              </Tooltip>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  pt: 2,
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  Team: {scorer.team.name}
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateX(-5px)",
                      },
                    }}
                  >
                    Goals: {scorer.goals}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateX(-5px)",
                      },
                    }}
                  >
                    Assists: {scorer.assists}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Statistics;
