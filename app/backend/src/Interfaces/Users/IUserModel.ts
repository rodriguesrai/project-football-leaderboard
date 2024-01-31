import { IUser } from './IUsers';

export default interface IUserModel {
  findAll(): Promise<IUser[]>
}
