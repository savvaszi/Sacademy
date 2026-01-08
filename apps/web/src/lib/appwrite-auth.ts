import { account } from './appwrite';
import { ID } from 'appwrite';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const appwriteAuth = {
  async login(credentials: LoginCredentials) {
    try {
      const session = await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );
      return { success: true, session };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error };
    }
  },

  async register(data: RegisterData) {
    try {
      const user = await account.create(
        ID.unique(),
        data.email,
        data.password,
        `${data.firstName} ${data.lastName}`
      );
      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error };
    }
  },

  async logout() {
    try {
      await account.deleteSession('current');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error };
    }
  },

  async getCurrentUser() {
    try {
      const user = await account.get();
      return { success: true, user };
    } catch (error) {
      return { success: false, error };
    }
  },

  async getSession() {
    try {
      const session = await account.getSession('current');
      return { success: true, session };
    } catch (error) {
      return { success: false, error };
    }
  },
};
