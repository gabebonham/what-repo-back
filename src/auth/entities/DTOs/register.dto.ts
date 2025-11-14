export class RegisterDto {
  password: string;
  email: string;
  username: string;
  phone: string;
  constructor(
    password: string,
    email: string,
    username: string,
    phone: string,
  ) {
    this.password = password;
    this.email = email;
    this.username = username;
    this.phone = phone;
  }
}
