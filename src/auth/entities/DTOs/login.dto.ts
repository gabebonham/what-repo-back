export class LoginDto {
  password: string;
  email: string;
  constructor(username: string, password: string, email: string) {
    this.password = password;
    this.email = email;
  }
}
