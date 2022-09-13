import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/interface/quiz';
import { ApiService } from 'src/app/service/api.service';
import * as $ from "jquery";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

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
  quizType!: string;

  total_time : number = 120; // (in minutes)
  // var hour = Math.floor(totalTimeInMinutes / 60); //1h
  // var minutes = totalTimeInMinutes - (hour * 60); //30m


  seconds: number = 3600;
  interval : any;

  constructor(
    private api : ApiService,
  ) { }


  ngOnInit(): void {

    this.getQuiz();
    $(".submit").hide();
    // console.log();


  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        this.seconds--;
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  transform(value: number, args?: any): string | any {

    // const hours: number = Math.floor(value / 60);
    // const minutes: number = (value - hours * 60);

    // if (hours < 10 && minutes < 10) {
    //     return '0' + hours + ':0' + (value - hours * 60);
    // }
    // if (hours > 10 && minutes > 10) {
    //     return hours + ':' + (value - hours * 60);
    // }
    // if (hours > 10 && minutes < 10) {
    //     return hours + ':0' + (value - hours * 60);
    // }
    // if (hours < 10 && minutes > 10) {
    //     return '0' + hours + ':' + (value - hours * 60);
    // }
    // return hours + ':' + (value - hours * 60);
    const minutes: number = Math.floor(value / 60);
    const seconds: number = (value - minutes * 60);

    if (minutes < 10 && seconds < 10) {
        return '0' + minutes + ':0' + (value - minutes * 60);
    }
    if (minutes > 10 && seconds > 10) {
        return minutes + ':' + (value - minutes * 60);
    }
    if (minutes > 10 && seconds < 10) {
        return minutes + ':0' + (value - minutes * 60);
    }
    if (minutes < 10 && seconds > 10) {
        return '0' + minutes + ':' + (value - minutes * 60);
    }
    return minutes + ':' + (value - minutes * 60);
  }

  getQuiz() {
    this.api.getQuizById(9).subscribe({
      next: (data) => {
        clearInterval(this.counter);

        this.startTimer()
        this.delayTime(2);
        // this.startCounter();
        this.quiz = data;
        console.log(this.quiz.questions[this.current_question].questionType.name);
        this.quizTitle = this.quiz.name;
        // console.log(data.questions[this.current_question].questionType.name);

        console.log(this.quiz.questions);

        this.questionList = this.quiz.questions;
        this.questionList[0].answer.forEach((element: any) => {
          console.log(element.name);
        });
      }
    })
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
      // this.startCounter();
    } else {
      clearInterval(this.time)
      // this.startCounter();

        // if(this.current_question < this.questionList.length) {
        //   $(".next").hide();
        //   $(".submit").show();
        //   // this.question_answers.push
        // }
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

}
