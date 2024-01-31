// src/interfaces/books/IBookModel.ts

// import { NewEntity } from '..';
import { ITeam } from './ITeam';

export default interface ITeamModel {
  findAll(): Promise<ITeam[]>,
  findById(id: ITeam['id']): Promise<ITeam | null>,
}
