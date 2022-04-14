import { IeltsScore } from "./goals-types";

export interface iSocialUser {
  avatar: string;
  cover: string;
  full_name: string;
  avgScore: IeltsScore;
  points: number;
}
