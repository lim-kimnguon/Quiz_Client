import { Answer } from './answer';
export interface Question {
  id :  number;
  name : string;
  answer: Answer[];
  type : string;
}
