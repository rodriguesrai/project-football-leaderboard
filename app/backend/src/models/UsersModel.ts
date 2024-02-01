import { IUser } from '../Interfaces/Users/IUsers';
import UsersModelSequelize from '../database/models/UserModelSequelize';
import IUserModel from '../Interfaces/Users/IUserModel';

export default class UserModel implements IUserModel {
  private model = UsersModelSequelize;

  async findByEmail(email:string): Promise<IUser | null> {
    const dbResponse = await this.model.findOne({
      where: {
        email,
      },
    });
    return dbResponse;
  }

  async findById(id: number): Promise<IUser | null> {
    const dbResponse = await this.model.findByPk(id);
    return dbResponse;
  }
}
