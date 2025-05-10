"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { fetchMatches } from "@/services/api";

interface Match {
  id: number;
  homeTeam: {
    name: string;
    crest: string;
  };
  awayTeam: {
    name: string;
    crest: string;
  };
  utcDate: string;
  status: string;
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await fetchMatches();
        setMatches(data.matches);
      } catch (err) {
        setError("Failed to load matches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Upcoming Matches
        </h1>

        {loading && (
          <div className="text-center">
            <p className="text-gray-500">Loading matches...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {match.homeTeam.crest && (
                        <img
                          src={match.homeTeam.crest}
                          alt={`${match.homeTeam.name} crest`}
                          className="h-8 w-8 object-contain"
                        />
                      )}
                      <span className="font-medium">{match.homeTeam.name}</span>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-500">
                        {formatDate(match.utcDate)}
                      </div>
                      <div className="text-lg font-bold">
                        {match.score.fullTime.home !== null &&
                        match.score.fullTime.away !== null
                          ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                          : "vs"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {match.status}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{match.awayTeam.name}</span>
                      {match.awayTeam.crest && (
                        <img
                          src={match.awayTeam.crest}
                          alt={`${match.awayTeam.name} crest`}
                          className="h-8 w-8 object-contain"
                        />
                      )}
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
