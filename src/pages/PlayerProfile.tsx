import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Tooltip,
  Chip,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { getPlayerDetails } from "../services/api";
import type { Player } from "../types/football";
import { commonAnimationStyles } from "../utils/animations";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`player-tabpanel-${index}`}
      aria-labelledby={`player-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const PlayerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      if (id) {
        try {
          const response = await getPlayerDetails(id);
          setPlayer(response.data);
        } catch (error) {
          console.error("Error fetching player details:", error);
        }
      }
    };

    fetchPlayerDetails();
  }, [id]);

  if (!player) {
    return (
      <Box sx={{ ...commonAnimationStyles.fadeIn, textAlign: "center", py: 4 }}>
        <Typography variant="h5">Loading player details...</Typography>
      </Box>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            mb: 2,
          }}
        >
          <Avatar
            src={player.photo}
            alt={player.name}
            sx={{
              width: 120,
              height: 120,
              border: "4px solid rgba(255, 255, 255, 0.1)",
              ...commonAnimationStyles.pulse,
            }}
          />
          <Box>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                ...commonAnimationStyles.gradient,
                mb: 1,
              }}
            >
              {player.name}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {player.team.name} • {player.position}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          mb: 4,
          "& .MuiTab-root": {
            color: "text.secondary",
            "&.Mui-selected": {
              color: "primary.main",
            },
          },
          "& .MuiTabs-indicator": {
            background: "linear-gradient(45deg, #0070f3, #7928ca)",
          },
        }}
      >
        <Tab label="Overview" />
        <Tab label="Statistics" />
        <Tab label="Career" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                ...commonAnimationStyles.scaleIn,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    ...commonAnimationStyles.gradient,
                  }}
                >
                  <SportsSoccerIcon />
                  Performance Stats
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Goals
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {player.statistics.goals}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(player.statistics.goals / 20) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        background: "rgba(255, 255, 255, 0.1)",
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(45deg, #0070f3, #7928ca)",
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Assists
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {player.statistics.assists}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(player.statistics.assists / 15) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        background: "rgba(255, 255, 255, 0.1)",
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(45deg, #0070f3, #7928ca)",
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Minutes Played
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {player.statistics.minutesPlayed}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(player.statistics.minutesPlayed / 3420) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        background: "rgba(255, 255, 255, 0.1)",
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(45deg, #0070f3, #7928ca)",
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                ...commonAnimationStyles.scaleIn,
                animationDelay: "0.1s",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    ...commonAnimationStyles.gradient,
                  }}
                >
                  <EmojiEventsIcon />
                  Achievements
                </Typography>
                <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {player.achievements?.map((achievement, index) => (
                    <Chip
                      key={index}
                      label={achievement}
                      sx={{
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Card
          sx={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            ...commonAnimationStyles.scaleIn,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                ...commonAnimationStyles.gradient,
              }}
            >
              <TrendingUpIcon />
              Detailed Statistics
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {Object.entries(player.statistics).map(([key, value]) => (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <Box
                    sx={{
                      p: 2,
                      background: "rgba(255, 255, 255, 0.03)",
                      borderRadius: 2,
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Card
          sx={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            ...commonAnimationStyles.scaleIn,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                ...commonAnimationStyles.gradient,
              }}
            >
              <AccessTimeIcon />
              Career History
            </Typography>
            <Box sx={{ mt: 2 }}>
              {player.career?.map((career, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: 2,
                    background: "rgba(255, 255, 255, 0.03)",
                    borderRadius: 2,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateX(8px)",
                    },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {career.team}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {career.period} • {career.role}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {career.achievements}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
};

export default PlayerProfile;
