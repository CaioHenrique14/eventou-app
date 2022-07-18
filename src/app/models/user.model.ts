import { Generic } from './generic.model';


export class User extends Generic{
  email?: string;
  name?: string;
  birthDate?: string;
  role?: string;
  phone?: string;
  password?: string;
  token?: string;
}
