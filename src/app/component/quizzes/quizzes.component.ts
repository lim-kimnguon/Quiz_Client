import { interval } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/interface/quiz';
import { ApiService } from 'src/app/service/api.service';
import * as $ from "jquery";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {

  answer = 0;
  quiz !: Quiz;
  quizTitle !: string;
  current_question : number = 0;
  counter : number = 10;
  default_time : number = 10;
  time : any;
  isDone : boolean = false;
  questionList : any = [];
  percent : number = 100;
  a_index!: number;
  question_answers: any = [];
  old_question : boolean = false;
  timeOut : number = 10;
  hour !: number;
  minutes !: number;

  new_question!: string;
  test_question !: [];

  display : any;
  interval : any;
  quizTime: any;
  totalTimeInMinutes : number = 120; // (in minutes)
  // var hour = Math.floor(totalTimeInMinutes / 60); //1h
  // var minutes = totalTimeInMinutes - (hour * 60); //30m


  // questions : string = "This is [a] that I [b] almost [c] in my *.";


  gap_answers : any = [
    {name: "things", order: 1},
    {name: "do", order: 2},
    {name: "everyday", order: 3},
    {name: "life", order: 4},
    {name: "test", order: 5},
  ];
  blanks : any = [
    {name: "Answer 1", order: 1},
    {name: "Answer 2", order: 2},
    {name: "Answer 3", order: 3},
    {name: "Answer 4", order: 4},
    {name: "Answer 5", order: 5},
  ]

  constructor(
    private api : ApiService,
  ) { }

  // questions : string = "This is ____ that I ____ almost ____ in my ____.";
  questions : string = "This is * that I * almost * in my *.";

  ngOnInit(): void {
    this.new_question = this.questions.replace(/\*/gi, `
      <span
        cdkDropList
        [cdkDropListData]="done"
        class="example-list"
        (cdkDropListDropped)="drop($event)">
      </span>

      <span class="example-box" *ngFor="let item of done" cdkDrag>_______</span>
    `);


    this.getQuiz();
    $(".submit").hide();
    this.hour = Math.floor(this.totalTimeInMinutes / 60); //1h
    let hours = this.hour;
    this.minutes = this.totalTimeInMinutes - (hours * 60); //30m
    this.display=this.transform( this.totalTimeInMinutes)
    console.log(this.transform( this.totalTimeInMinutes));

  }

  getQuiz() {
    this.api.getQuizById(9).subscribe({
      next: (data) => {
        clearInterval(this.counter);

        this.delayTime(2);
        this.startCounter();
        this.quiz = data;
        this.quizTitle = this.quiz.name;
        console.log(this.quiz.questions);

        this.questionList = this.quiz.questions;
        this.questionList[0].answer.forEach((element: any) => {
          console.log(element.name);
        });
      }
    })
  }

  details() {

    for(let i=0; i<this.blanks.length; i++) {
      if(this.blanks[i].order == i+1) {
        console.log(this.blanks[i].order);
      }
    }
  }

  startTimer() {
    this.interval = () => {
      this.totalTimeInMinutes--;

      if(this.totalTimeInMinutes == 0) {
        console.log("On Time");

      }
    }

    this.quizTime = setInterval(interval, 1000);
  }

  transform(value: number): string {
    var sec_num = value;
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    // if (hours   < 10) {hours   = 0;}
    // if (minutes < 10) {minutes = 0;}
    // if (seconds < 10) {seconds = 0;}

    return hours+':'+minutes+':'+seconds;
  }

  nextQuestion() {
    this.storeAnswer(this.quiz.questions[this.current_question].id, this.a_index);

    this.current_question++;
    this.answer = this.getAnswerId();
    this.isDone = this.checkOldQuestion();

    if(this.current_question > 1) {
      this.clearOldAnswerId();
    }

    if(this.current_question < this.questionList.length-1) {
      clearInterval(this.time)
      this.startCounter();
    } else {
      clearInterval(this.time)
      this.startCounter();

        if(this.current_question < this.questionList.length) {
          $(".next").hide();
          $(".submit").show();
          this.question_answers.push
        }
    }

    if(this.counter == 0) {
      clearInterval(this.time)
    } else {
      this.counter = 10;
    }
  }

  submitQuestion() {
    this.storeAnswer(this.quiz.questions[this.current_question].id, this.a_index);
  }

  previousQuestion() {
    this.current_question--;
    this.counter = 0;
    clearInterval(this.time);
    this.answer = this.getAnswerId();
    this.isDone = this.checkOldQuestion();
  }

  submit() {
    console.log("submit");
  }

  storeAnswer(q_id : number, a_id : number) {
    console.log(q_id + " " +a_id);

    if(this.isDone === false) {

      this.question_answers[this.current_question] = {
        questionId: q_id,
        answerId: a_id
      }
    }
    console.log(this.question_answers);
  }

  getAnswerId() {
    if(this.question_answers[this.current_question] == undefined) {
      return 0;
    }

    let a_id = this.question_answers[this.current_question].answerId;
    console.log(this.question_answers[this.current_question]);
    return a_id;
  }

  checkOldQuestion() {
    if(this.question_answers[this.current_question] == null) {
      console.log("New");

      this.old_question = false;
      return false;
    } else {
      console.log("Old");

      this.old_question = true;
      return true;
    }
  }

  clearOldAnswerId() {

      if(this.question_answers[this.current_question-1].answerId == this.question_answers[this.current_question-2].answerId) {
        this.question_answers[this.current_question-1].answerId = 0;
        console.log("answer");
      }
  }

  checkQuestion(answer_id : number) {

    if(answer_id == this.questionList[this.current_question].answer.forEach((element:any) => {
      if(element.is_correct){
        console.log(element.id);
      }
    })) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }

  }

  getAnswer(data: any, index: number) {
    this.a_index = data[index].id;
  }

  startCounter() {
    var startTime = () => {
      this.counter--;

      if(this.counter < 0) {
        clearInterval(this.time);

        if(this.current_question < this.questionList.length-1) {
          this.nextQuestion();
        }
      }
    }

    this.time = setInterval(startTime, 1000);
  }

  setNewTime(times : number) {
    this.timeOut = times;
  }

  resetTime() {
    clearInterval(this.time);
    this.setNewTime(this.default_time);

  }

  delayTime(delay: number) {
    setTimeout(() => {
    }, delay*1000);
  }


  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Hello'];

  Array_data = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  String_data = "";


  drop(event: CdkDragDrop<string[]>) {
    // this.test_question

    if(event.container.data.length == 1){
      return // this will stop item from drop
     }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }



  // onDropArray(event: CdkDragDrop<any>) {
  //   if(event.previousContainer === event.container) {
  //     this.moveItem(event.container.data);
  //   } else {
  //     this.transferItem(event.previousContainer.data, event.container.data);
  //   }
  // }

  onDropString(event: CdkDragDrop<any>) {
    if(event.previousContainer === event.container) {
      this.moveItem(event.container.data);
    } else {
      this.transferItem(event.previousContainer.data, event.container.data);
    }
  }

  moveItem(container_data : any) {


  }

  transferItem(previousContainer_data: any, container_data: any) {

  }

}
