import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCompetitions } from "../services/api";
import type { Competition } from "../types/football";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";

const Home = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
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

  const QuickLinkCard = ({
    icon: Icon,
    title,
    description,
  }: {
    icon: any;
    title: string;
    description: string;
  }) => (
    <Card
      sx={{
        height: "100%",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Icon sx={{ color: theme.palette.primary.main, mr: 1 }} />
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <Typography color="text.secondary">{description}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box
        sx={{
          textAlign: "center",
          mb: 8,
          background:
            "linear-gradient(45deg, rgba(0,112,243,0.1), rgba(121,40,202,0.1))",
          py: 8,
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
          Welcome to Football Stats
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          sx={{ maxWidth: "800px", mx: "auto", px: 2 }}
        >
          Your one-stop destination for comprehensive football statistics and
          real-time information
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box sx={{ flex: { md: "2" } }}>
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
                }}
              >
                <EmojiEventsIcon color="primary" />
                Featured Competitions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {competitions.slice(0, 5).map((competition) => (
                  <Box
                    key={competition.id}
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      background: "rgba(255, 255, 255, 0.03)",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.05)",
                      },
                    }}
                  >
                    <Typography>{competition.name}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: { md: "1" } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <QuickLinkCard
              icon={SportsSoccerIcon}
              title="Live Matches"
              description="Track ongoing matches and get real-time updates on scores and statistics"
            />
            <QuickLinkCard
              icon={TrendingUpIcon}
              title="Statistics"
              description="Explore detailed player and team statistics, including goals, assists, and more"
            />
            <QuickLinkCard
              icon={GroupsIcon}
              title="Team Analysis"
              description="Dive deep into team performance, formations, and tactical analysis"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
