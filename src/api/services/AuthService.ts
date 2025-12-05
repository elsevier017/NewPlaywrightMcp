import { BaseApiService } from './BaseApiService';
import { Auth } from '../models/auth.interface';

export class AuthService extends BaseApiService {
  async login(username: string, password: string): Promise<string> {
    // Example endpoint: /auth
    const response = await this.api.post('/auth', { username, password });
    return response.data.token;
  }
}
