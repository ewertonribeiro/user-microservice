export interface IUser {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  password: number | string;
  avatar?: string;
  token?: string | null;
}
