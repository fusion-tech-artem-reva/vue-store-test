import type { AuthenticationResponse } from '@/types/response.model';
import type { UserType } from '@/types/user.model';
import axios from './index';

export interface AuthRequiredFields {
  email: string;
  password: string;
}

export class AuthenticationAPI {
  static urlPrefix = '/auth';

  static async signUp(authData: AuthRequiredFields): Promise<AuthenticationResponse<UserType>> {
    return axios.post(`${AuthenticationAPI.urlPrefix}/signUp`, authData)
      .then(r => r.data)
  }

  static async signIn(authData: AuthRequiredFields): Promise<AuthenticationResponse<UserType>> {
    return axios.post(`${AuthenticationAPI.urlPrefix}/signIn`, authData)
      .then(r => r.data)
  }
}