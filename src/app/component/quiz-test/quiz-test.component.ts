import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  QuestionDetails,
  QuestionDetailsResponse,
} from '../../interface/quiz-test';
import { ApiService } from 'src/app/service/api.service';
import { Quiz } from 'src/app/interface/quiz';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.css'],
})
export class QuizTestComponent implements OnInit {
  questionDetails!: QuestionDetails;
  quizzes: any;
  questionList: any = [];

  questions: any = [
    { id: 1, name: 'The children $$_$$ and $$_$$ all $$_$$ the $$_$$' },
    { id: 2, name: 'The $$_$$ walked $$_$$ jumped $$_$$ over the' },
    { id: 3, name: 'The children $$_$$ fk $$_$$ jumped all $$_$$ the house $$_$$' },
  ];

  options: any = [
    { id: 1, name: ['after', 'house', 'jumped', 'over', 'walked'] },
    { id: 2, name: ['me', 'you', 'jumped', 'over', 'walked'] },
    { id: 3, name: ['after', 'house', 'jumped', 'over', 'walked'] }
  ];

  current_question: number = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getQuestionDetail();
    this.getQuiz();
    // console.log(this.questionList[this.current_question]);

    $('.submit').hide();

    this.startTimer();
  }

  getQuiz() {
    this.api.getQuizById(11).subscribe({
      next: (data) => {
        // this.getQuestionDetail();
        console.log(data);
        this.quizzes = data;
        this.questionList = this.quizzes.questions;
        console.log(this.questionList[this.current_question]);
      },
      error: (data) => {},
    });
  }

  nextQuestion() {
    this.current_question++;
    this.getQuestionDetail();
  }

  previousQuestion() {
    this.current_question--;
    this.getQuestionDetail();
  }

  public trackByMethod(index: number): number {
    return index;
  }

  private getQuestionDetail = () => {
    const successHandler = (resp: QuestionDetailsResponse) => {
      this.questionDetails = this.processQuestionResponse(resp);
    };

    const errorHandler = () => {};

    this.getQuestionDetails().subscribe(successHandler, errorHandler);
  };

  drop(event: CdkDragDrop<string[]>) {
    // debugger;
    if (event.previousContainer === event.container) {
      return;
    }

    const allowTheMove = () => {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    };

    const swap = () => {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      transferArrayItem(
        event.container.data,
        event.previousContainer.data,
        event.currentIndex + 1,
        event.previousIndex
      );
    };

    if (event.container.data.length !== 1) {
      console.log(event.container.data);

      allowTheMove();
    } else {
      console.log(event.container.data);
      swap();
    }
  }

  public getQuestionDetails(): Observable<any> {
    return of({
      question: this.questions,
      // question: this.questionList[this.current_question].name,
      // [ {id: 1, name: []} ]
      options: this.options,
    });
  }

  public processQuestionResponse(
    rawResponse: QuestionDetailsResponse
  ): QuestionDetails {
    const questionDetails = {

      questions: this.questions[this.current_question].name
        .split('$$_$$')
        .filter((question: any) => {
          return question;
        }),

      options: this.options[this.current_question].name,

      answers: new Array(
        this.questions[this.current_question].name
          .split('$$_$$')
          .filter((question: any) => {
            return question;
          }).length
      ),
    };
    questionDetails.questions.forEach((quest: any, i: any) => {
      questionDetails['answers'][i] = [];
    });

    return questionDetails;
  }

  // answer = 0;
  // quiz !: Quiz;
  // quizTitle !: string;
  // current_question : number = 0;
  // counter : number = 10;
  // default_time : number = 10;
  // time : any;
  // isDone : boolean = false;

  // percent : number = 100;
  // a_index!: number;
  // question_answers: any = [];
  // old_question : boolean = false;
  // timeOut : number = 10;
  // quizType!: string;

  times: number = 3600;
  interval: any;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.times === 0) {
        this.times--;
      } else {
        this.times--;
      }
    }, 1000);
  }

  transform(value: number, args?: any): string | any {
    const hours: number = Math.floor(value / 60);
    const minutes: number = value - hours * 60;
    // const seconds: number = minutes * 60;

    if (hours < 10 && minutes < 10) {
      return '0' + hours + ':0' + (value - hours * 60);
    }
    if (hours > 10 && minutes > 10) {
      return hours + ':' + (value - hours * 60);
    }
    if (hours > 10 && minutes < 10) {
      return hours + ':0' + (value - hours * 60);
    }
    if (hours < 10 && minutes > 10) {
      return '0' + hours + ':' + (value - hours * 60);
    }
  }

  // nextQuestion() {
  //   // this.storeAnswer(this.quiz.questions[this.current_question].id, this.a_index);
  //   // this.current_question++;
  //   // this.answer = this.getAnswerId();
  //   // this.isDone = this.checkOldQuestion();
  //   // if(this.current_question > 1) {
  //   //   this.clearOldAnswerId();
  //   // }
  //   // if(this.current_question < this.questionList.length-1) {
  //   //   clearInterval(this.time)
  //   // } else {
  //   //   clearInterval(this.time)
  //   // }
  //   // if(this.counter == 0) {
  //   //   clearInterval(this.time)
  //   // } else {
  //   //   this.counter = 10;
  //   // }
  // }

  submitQuestion() {
    // this.storeAnswer(this.quiz.questions[this.current_question].id, this.a_index);
  }

  // previousQuestion() {
  //   // this.current_question--;
  //   // this.counter = 0;
  //   // clearInterval(this.time);
  //   // this.answer = this.getAnswerId();
  //   // this.isDone = this.checkOldQuestion();
  // }

  storeAnswer(q_id: number, a_id: number) {
    // console.log(q_id + " " +a_id);
    // if(this.isDone === false) {
    //   this.question_answers[this.current_question] = {
    //     questionId: q_id,
    //     answerId: a_id
    //   }
    // }
    // console.log(this.question_answers);
  }

  getAnswerId() {
    // if(this.question_answers[this.current_question] == undefined) {
    //   return 0;
    // }
    // let a_id = this.question_answers[this.current_question].answerId;
    // console.log(this.question_answers[this.current_question]);
    // return a_id;
  }

  checkOldQuestion() {
    // if(this.question_answers[this.current_question] == null) {
    //   console.log("New");
    //   this.old_question = false;
    //   return false;
    // } else {
    //   console.log("Old");
    //   this.old_question = true;
    //   return true;
    // }
  }

  clearOldAnswerId() {
    // if(this.question_answers[this.current_question-1].answerId == this.question_answers[this.current_question-2].answerId) {
    //   this.question_answers[this.current_question-1].answerId = 0;
    //   console.log("answer");
    // }
  }

  checkQuestion(answer_id: number) {
    // if(answer_id == this.questionList[this.current_question].answer.forEach((element:any) => {
    //   if(element.is_correct){
    //     console.log(element.id);
    //   }
    // })) {
    //   console.log("true");
    //   return true;
    // } else {
    //   console.log("false");
    //   return false;
    // }
  }

  // getAnswer(data: any, index: number) {
  //   this.a_index = data[index].id;
  // }
}
