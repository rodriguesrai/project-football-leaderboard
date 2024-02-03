export const teamsMockData = [
  { id: 1, teamName: 'TimeA' },
  { id: 2, teamName: 'TimeB' },

];

export const matchesMockData = [{
  id: 1,
  homeTeamId: 1,
  homeTeamGoals: 4,
  awayTeamId: 2,
  awayTeamGoals: 3,
  inProgress: false,
  homeTeam: {
    teamName: 'TimeA'
  },
  awayTeam: {
    teamName: 'TimeB'
  }
},
{
  id: 2,
  homeTeamId: 2,
  homeTeamGoals: 3,
  awayTeamId: 1,
  awayTeamGoals: 4,
  inProgress: false,
  homeTeam: {
    teamName: 'TimeB'
  },
  awayTeam: {
    teamName: 'TimeA'
  }
},
];

export const leaderboardAllMockData = [
  {
    name: 'TimeA',
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 8,
    goalsOwn: 6,
    goalsBalance: 2,
    efficiency: '100.00'
  },
  {
    name: 'TimeB',
    totalPoints: 0,
    totalGames: 2,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 2,
    goalsFavor: 6,
    goalsOwn: 8,
    goalsBalance: -2,
    efficiency: '0.00'
  }
];

export const leaderboardHomeMockData = [
  {
    name: 'TimeA',
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 8,
    goalsOwn: 6,
    goalsBalance: 2,
    efficiency: '100.00'
  },
  {
    name: 'TimeB',
    totalPoints: 0,
    totalGames: 2,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 2,
    goalsFavor: 6,
    goalsOwn: 8,
    goalsBalance: -2,
    efficiency: '0.00'
  }
];

export const leaderboardHomeData = [
  {
    name: 'TimeA',
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 8,
    goalsOwn: 6,
    goalsBalance: 2,
    efficiency: '100.00'
  },
  {
    name: 'TimeB',
    totalPoints: 0,
    totalGames: 2,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 2,
    goalsFavor: 6,
    goalsOwn: 8,
    goalsBalance: -2,
    efficiency: '0.00'
  }
];