import { ROLE } from "../enums";

export interface IUser {
  email: string;
  fullName: string;
  id: number;
  isActive: boolean;
  profilePhoto: string;
  role: string;
}

export interface IProfessor {
  Items: any[];
  Medals: any[];
  Students: any[];
  User: IUser;
  createdAt: string;
  grammar: string;
  id: number;
  updatedAt: string;
  userId: number;
}

export interface IJwtPayload {
  sub: number; // userID
  email: string;
  role: ROLE;
  iat: number; // CreatedAt
  exp: number; // ExpiresIn
}

export default interface AuthContextType {
  user: IJwtPayload | null;
  token: string | null;
  signIn: (jwtToken: string) => void;
  signOut: () => void;
  loading: boolean;
}
