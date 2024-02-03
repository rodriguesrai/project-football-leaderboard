import { IMatches } from './IMatches';

export interface IMatchesWithName extends IMatches {
  homeTeam: {
    teamName: string;
  };
  awayTeam: {
    teamName: string;
  };
}
