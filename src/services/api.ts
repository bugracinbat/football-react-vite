import axios from "axios";

const api = axios.create({
  baseURL: "/api",
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

export default api;
