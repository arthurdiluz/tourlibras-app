import { ROLE } from "../enums";

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

export interface IUser {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  isActive: boolean;
  email: string;
  fullName: string;
  profilePhoto: string;
  role: string;
  Professor: any;
  Student: any;
}

export interface IProfessor {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  grammar: string;
  userId: number;
  User: IUser;
  Medals: IMedal[];
  Items: any[];
  Students: any[];
}

export interface IMedal {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  name: string;
  description: string;
  media: string;
  professorId: number;
}

export interface ILevel {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  level: number;
  earnedXp: number;
  earnedMoney: number;
  lessonId: number;
  medalId: number;
}

export interface ILesson {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  title: string;
  icon: string;
  professorId: number;
  medalId: any;
  Professor: IProfessor;
  Students: any[];
  Levels: any[];
  Medal: any;
}
