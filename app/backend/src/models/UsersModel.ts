import { IUser } from '../Interfaces/Users/IUsers';
import UsersModelSequelize from '../database/models/UserModelSequelize';
import IUserModel from '../Interfaces/Users/IUserModel';

export default class UserModel implements IUserModel {
  private model = UsersModelSequelize;

  async findAll(): Promise<IUser[]> {
    const dbResponse = await this.model.findAll();
    return dbResponse;
  }
}
