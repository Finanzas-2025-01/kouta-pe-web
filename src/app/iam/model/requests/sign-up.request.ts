export class SignUpRequest {
  public username: string;
  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public roles: Roles[];

  constructor(username: string, name: string, surname: string,
              email: string, password: string, roles: Roles[]) {
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}


enum Roles {
  ROLE_USER,
  ROLE_LEADER,
  ROLE_MEMBER
}
