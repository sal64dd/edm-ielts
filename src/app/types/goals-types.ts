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
