import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { QuizService } from '../../service/quiz-service.service';
import { QuestionDetails, QuestionDetailsResponse } from '../../interface/quiz-test';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.css']
})

export class QuizTestComponent implements OnInit {

  questionDetails!: QuestionDetails;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.getQuestionDetails();
  }

  public trackByMethod(index: number): number {
    return index;
  }

  private getQuestionDetails = () => {
    const successHandler = (resp: QuestionDetailsResponse) => {
      this.questionDetails = this.quizService.processQuestionResponse(resp);
      console.log(this.questionDetails);
    };

    const errorHandler = () => {};

    this.quizService
      .getQuestionDetails()
      .subscribe(successHandler, errorHandler);
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

}
