import axios from "axios";

const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getCompetitions = () => api.get("/competitions");
export const getTeams = (competitionId: string) =>
  api.get(`/competitions/${competitionId}/teams`);
export const getTeam = (teamId: string) => api.get(`/teams/${teamId}`);
export const getMatches = (competitionId: string) =>
  api.get(`/competitions/${competitionId}/matches`);
export const getScorers = (competitionId: string) =>
  api.get(`/competitions/${competitionId}/scorers`);
export const getStandings = (competitionId: string) =>
  api.get(`/competitions/${competitionId}/standings`);
export const getPlayerDetails = (playerId: string) =>
  api.get(`/players/${playerId}`);
export const searchPlayers = (query: string) =>
  api.get(`/players/search?q=${encodeURIComponent(query)}`);

export default api;
