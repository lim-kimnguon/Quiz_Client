import { FinishPageComponent } from './page/finish-page/finish-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { QuizComponent } from './component/quiz/quiz.component';
import { RuleComponent } from './component/rule/rule.component';
import { AllQuizComponent } from './page/all-quiz/all-quiz.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path : 'quiz', component: QuizComponent },
  { path : 'all-quiz', component: AllQuizComponent },
  { path : 'rule', component: RuleComponent },
  { path : 'finish-page', component: FinishPageComponent},
  { path:  '**' , component: HomeComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
