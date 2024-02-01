import { IUser } from './IUsers';

export default interface IUserModel {
  findByEmail(email: string): Promise<IUser | null>
}
