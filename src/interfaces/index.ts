import { ROLE } from "../constants/constants";

export interface IJwtPayload {
  sub: number; // userID
  email: string;
  role: ROLE;
  iat?: number; // CreatedAt
  exp?: number; // ExpiresIn
}

export interface User {
  email: string;
  fullName: string;
  id: number;
  isActive: boolean;
  profilePhoto: string;
  role: string;
}

export interface Professor {
  Items: any[];
  Medals: any[];
  Students: any[];
  User: User;
  createdAt: string;
  grammar: string;
  id: number;
  updatedAt: string;
  userId: number;
}
