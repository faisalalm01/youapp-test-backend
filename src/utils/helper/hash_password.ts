import * as bcrypt from 'bcrypt';

export class PasswordHashHelper {
  static async hash(
    password: string,
  ): Promise<{ hash: string; passKey: string }> {
    const passKey = StringHelper.generateRandomString(10);
    const hash = await bcrypt.hash(password + passKey, 10);

    return {
      passKey: passKey,
      hash: hash,
    };
  }

  static comparePassword(password: string, passKey: string, hash: string) {
    return bcrypt.compare(password + passKey, hash);
  }
}

export class StringHelper {
  static generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
}
