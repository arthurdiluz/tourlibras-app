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

export interface IUserInput {
  email: string;
  password: string;
  fullName: string;
  role: string | null;
}

export interface IUserOutput {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  isActive: boolean;
  email: string;
  fullName: string;
  profilePhoto?: string | null;
  role: string;
  Professor?: IProfessor | null;
  Student: any;
}

export interface IProfessor {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  grammar: string;
  userId: number;
  User: IUserOutput;
  Medals: Array<IMedalOutput>;
  Items: Array<IItemOutput>;
  Students: any[];
}

export interface IMedalInput {
  name: string;
  description: string;
  media: string;
}

export interface IMedalOutput {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  media: string;
  professorId: number;
  Professor: IProfessor;
}

export interface IItemInput {
  name: string;
  description: string;
  price: number;
  media: string;
}

export interface IItemOutput {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  price: number;
  media: string;
  professorId: number;
  Professor: IProfessor;
}

export interface ILessonInput {
  medalId: number;
  title: string;
  icon?: string | null;
}

export interface ILessonOutput {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  icon: string;
  professorId: number;
  medalId: number;
  Professor: IProfessor;
  Medal: IMedalOutput;
  Students: Array<any>;
  Levels: Array<ILessonLevelOutput>;
}

export interface ILessonLevelInput {
  level: number;
  earnedXp: number;
  earnedMoney: number;
}

export interface ILessonLevelOutput {
  id: number;
  createdAt: string;
  updatedAt: string;
  level: number;
  earnedXp: number;
  earnedMoney: number;
  lessonId: number;
  Lesson: ILessonOutput;
  LessonLevelExercises: ILevelExerciseOutput[];
}

export interface IAlternativeInput {
  text: string;
  isCorrect: boolean;
}

export interface IAlternativeOutput {
  id: number;
  createdAt: string;
  updatedAt: string;
  text: string;
  isCorrect: boolean;
}

export interface ILevelExerciseInput {
  media: string;
  statement: string;
  Alternatives: IAlternativeInput[];
}

export interface ILevelExerciseOutput {
  id: number;
  createdAt: string;
  updatedAt: string;
  media: string;
  statement: string;
  levelId: number;
  Level: ILessonLevelOutput;
  Alternatives: IAlternativeOutput[];
}
