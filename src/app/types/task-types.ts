export interface iTask {
  text: string;
  descp?: string;
  coverImg?: string;
  icon?: string;
  points?: string;
  isComplete: boolean;
  route?: string[];
}
