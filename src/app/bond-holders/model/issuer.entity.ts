export class Issuer {
  id!: number;
  username!: string;
  name!: string;
  surname!: string;
  email!: string;
  constructor() {
    this.id = 0;
    this.username = '';
    this.name = '';
    this.surname = '';
    this.email = '';
  }
}
