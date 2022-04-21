export interface UserGoalData{
  score: IeltsScore;
  testDate: Date;
  testBooked?: boolean;
  isComputerBased?: boolean;
}

export interface IeltsScore {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  overall: number;
}

export interface GetGoal{
  Goal_l: string,
  Goal_r: string,
  Goal_w: string,
  Goal_s: string,
  Goal_ag: string,
  goalDate: string,
  targateDate: string,
  daysLeft: number
}
