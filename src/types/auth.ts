export interface AuthState {
  userId: string;
  token: string;
  role: 'admin' | 'manager' | 'user';
  email: string;
}
