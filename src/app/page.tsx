import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-blue-600">Football Stats & Info</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Your ultimate destination for football statistics, team rosters, and
            match information.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Teams Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Team Rosters
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Explore detailed team rosters, player information, and team
                  statistics.
                </p>
              </div>
            </div>

            {/* Matches Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Upcoming Matches
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Stay updated with upcoming fixtures, match schedules, and
                  results.
                </p>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Top Scorers & Stats
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  View top scorers, assists, and comprehensive player
                  statistics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
