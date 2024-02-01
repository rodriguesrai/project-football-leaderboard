import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/UsersModel';
import verifyGenerateToken from '../utils/verifyGenerateToken';
import { Token } from '../types/Token';

export default class LoginService {
  private model = new UserModel();

  async login(email: string, password: string): Promise<ServiceResponse<Token | null>> {
    const modelResponse = await this.model.findByEmail(email);

    if (!modelResponse) {
      return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
    }

    const isPasswordValid = await bcrypt.compare(password, modelResponse.password);
    if (!isPasswordValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
    }
    const payload = { id: modelResponse.id, email: modelResponse.email, role: modelResponse.role };
    const token = await verifyGenerateToken.sign(payload);
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
