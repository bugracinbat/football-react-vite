"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { fetchTeams } from "@/services/api";

interface Team {
  id: number;
  name: string;
  tla: string;
  crest: string;
  venue: string;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchTeams();
        setTeams(data.teams);
      } catch (err) {
        setError("Failed to load teams. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Teams</h1>

        {loading && (
          <div className="text-center">
            <p className="text-gray-500">Loading teams...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    {team.crest && (
                      <img
                        src={team.crest}
                        alt={`${team.name} crest`}
                        className="h-12 w-12 object-contain mr-4"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {team.name}
                      </h3>
                      <p className="text-sm text-gray-500">{team.venue}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
