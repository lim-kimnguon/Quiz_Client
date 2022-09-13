import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuestionDetails, QuestionDetailsResponse } from '../interface/quiz-test';

@Injectable({
  providedIn: 'root'
})

export class QuizService {
  public getQuestionDetails(): Observable<any> {
    return of({
      question: 'The children $$_$$ and $$_$$ all $$_$$ the $$_$$',
      options: ['after', 'house', 'jumped', 'over', 'walked'],
    });
  }

  public processQuestionResponse(
    rawResponse: QuestionDetailsResponse
  ): QuestionDetails {
    const questionDetails = {
      questions: rawResponse.question.split('$$_$$').filter((question) => {
        return question;
      }),
      options: rawResponse.options,
      answers: new Array(
        rawResponse.question.split('$$_$$').filter((question) => {
          return question;
        }).length
      ),
    };
    questionDetails.questions.forEach((quest, i) => {
      questionDetails['answers'][i] = [];
    });

    return questionDetails;
  }
}
