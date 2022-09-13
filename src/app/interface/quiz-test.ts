export interface QuestionDetailsResponse {
  question: string;
  options: Array<string>;
}

export interface QuestionDetails {
  questions: Array<string>;
  options: Array<string>;
  answers: Array<Array<string>>;
}
