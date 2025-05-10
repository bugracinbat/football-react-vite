import axios from "axios";
import { API_ENDPOINTS, API_KEY } from "@/config/api";

const api = axios.create({
  headers: {
    "X-Auth-Token": API_KEY,
  },
});

export const fetchTeams = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.teams);
    return response.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

export const fetchMatches = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.matches);
    return response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
};

export const fetchTopScorers = async (competitionId: string) => {
  try {
    const response = await api.get(API_ENDPOINTS.topScorers(competitionId));
    return response.data;
  } catch (error) {
    console.error("Error fetching top scorers:", error);
    throw error;
  }
};

export const fetchCompetitions = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.competitions);
    return response.data;
  } catch (error) {
    console.error("Error fetching competitions:", error);
    throw error;
  }
};

export const fetchStandings = async (competitionId: string) => {
  try {
    const response = await api.get(API_ENDPOINTS.standings(competitionId));
    return response.data;
  } catch (error) {
    console.error("Error fetching standings:", error);
    throw error;
  }
};

export const fetchTeamStatistics = async (
  competitionId: string,
  teamId: string
) => {
  try {
    const response = await api.get(
      API_ENDPOINTS.teamStatistics(competitionId, teamId)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching team statistics:", error);
    throw error;
  }
};
