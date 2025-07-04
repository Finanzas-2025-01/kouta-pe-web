export class SignUpRequest {
  public username: string;
  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public roles: string[];

  constructor(username: string, name: string, surname: string,
              email: string, password: string, roles: string[]) {
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}

