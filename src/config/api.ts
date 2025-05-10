export const API_BASE_URL = "https://api.football-data.org/v4";

export const API_ENDPOINTS = {
  teams: `${API_BASE_URL}/teams`,
  matches: `${API_BASE_URL}/matches`,
  competitions: `${API_BASE_URL}/competitions`,
  topScorers: (competitionId: string) =>
    `${API_BASE_URL}/competitions/${competitionId}/scorers`,
  standings: (competitionId: string) =>
    `${API_BASE_URL}/competitions/${competitionId}/standings`,
  teamStatistics: (competitionId: string, teamId: string) =>
    `${API_BASE_URL}/competitions/${competitionId}/teams/${teamId}/statistics`,
};

// Note: You'll need to get an API key from football-data.org
export const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY;
