import { compare, hash } from 'bcrypt';

export const Password = {
  async Compare(password: string, hash: any): Promise<boolean> {
    const pass = password;
    const passHash = hash as string;

    try {
      const ComprePassword = await compare(pass, passHash);

      return ComprePassword;
    } catch (err) {
      throw new Error(`${hash}`);
    }
  },

  async encrypt(password: number | string): Promise<string> {
    const pass = password.toString();

    const passHash = await hash(pass, 8);

    return passHash;
  },
};
