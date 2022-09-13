import { QuizTestComponent } from './component/quiz-test/quiz-test.component';
import { Quiz2Component } from './component/quiz2/quiz2.component';
import { FinishPageComponent } from './page/finish-page/finish-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { QuizComponent } from './component/quiz/quiz.component';
import { RuleComponent } from './component/rule/rule.component';
import { AllQuizComponent } from './page/all-quiz/all-quiz.component';
import { QuizzesComponent } from './component/quizzes/quizzes.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path : 'quiz', component: QuizComponent },
  { path : 'quizzes', component: QuizzesComponent },
  { path : 'all-quiz', component: AllQuizComponent },
  { path : 'rule', component: RuleComponent },
  { path : 'finish-page', component: FinishPageComponent},
  { path : 'open-question-quiz', component: Quiz2Component},
  { path : 'quiz-test', component: QuizTestComponent},
  { path:  '**' , component: HomeComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
