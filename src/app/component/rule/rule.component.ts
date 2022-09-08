import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}
  
  roles = [
    {"role":"You will have only 15 seconds per each question."},
    {"role": "Once you select your answer, it can't be undone."},
    {"role": "You can't select any option once time goes off."},
    {"role": "You can't exit from the Quiz while you're playing."},
    {"role": "You'll get points on the basis of your correct answers"}
  ];

}
