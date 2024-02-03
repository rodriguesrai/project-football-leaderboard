import { ILeaderboardStats } from './ILeaderboardStats';

export default class LeaderboardStats implements ILeaderboardStats {
  constructor(
    public name: string,
    public stats: {
      totalPoints: number,
      totalGames: number,
      totalVictories: number,
      totalDraws: number,
      totalLosses: number,
      goalsFavor: number,
      goalsOwn: number,
    },
  ) {}

  get GetName(): string {
    return this.name;
  }

  get totalPoints(): number {
    return this.stats.totalVictories * 3 + this.stats.totalDraws;
  }

  get totalGames(): number {
    return this.stats.totalVictories + this.stats.totalDraws + this.stats.totalLosses;
  }

  get totalVictories(): number {
    return this.stats.totalVictories;
  }

  get totalDraws(): number {
    return this.stats.totalDraws;
  }

  get totalLosses(): number {
    return this.stats.totalLosses;
  }

  get goalsFavor(): number {
    return this.stats.goalsFavor;
  }

  get goalsOwn(): number {
    return this.stats.goalsOwn;
  }

  get goalsBalance(): number {
    return this.stats.goalsFavor - this.stats.goalsOwn;
  }

  get efficiency(): number {
    return this.totalGames ? (this.totalPoints / (this.totalGames * 3)) * 100 : 0;
  }
}
