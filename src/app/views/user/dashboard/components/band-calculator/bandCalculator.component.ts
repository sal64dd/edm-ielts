/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../services/core/common.service';

@Component({
  selector: 'bandCalculatorComponent',
  templateUrl: 'bandCalculator.component.html',
  styleUrls: ['bandCalculator.component.scss'],
})
export class bandCalculatorComponent {
  calSwitch: string = 'Conversion';
  calResult = {
    listening: {
      totalScore: 40,
      marks: '',
      result: '',
      score: [
        { data: [4, 5, 2.5] },
        { data: [6, 7, 3] },
        { data: [8, 10, 3.5] },
        { data: [10, 12, 4] },
        { data: [13, 15, 4.5] },
        { data: [16, 17, 5] },
        { data: [18, 22, 5.5] },
        { data: [23, 25, 6] },
        { data: [26, 29, 6.5] },
        { data: [30, 31, 7] },
        { data: [32, 34, 7.5] },
        { data: [35, 36, 8] },
        { data: [37, 38, 8.5] },
        { data: [39, 40, 9] },
      ],
      selectRange: [],
    },
    readingGeneral: {
      totalScore: 40,
      marks: '',
      result: '',
      score: [
        { data: [6, 8, 2.5] },
        { data: [9, 11, 3] },
        { data: [12, 14, 3.5] },
        { data: [15, 18, 4] },
        { data: [19, 22, 4.5] },
        { data: [24, 26, 5] },
        { data: [27, 29, 5.5] },
        { data: [30, 31, 6] },
        { data: [32, 33, 6.5] },
        { data: [34, 35, 7] },
        { data: [36, 36, 7.5] },
        { data: [37, 38, 8] },
        { data: [39, 39, 8.5] },
        { data: [40, 40, 39] },
      ],

      selectRange: [],
    },
    readingAcademic: {
      totalScore: 40,
      marks: '',
      result: '',
      score: [
        { data: [4, 5, 2.5] },
        { data: [6, 7, 3] },
        { data: [8, 9, 3.5] },
        { data: [10, 12, 4] },
        { data: [13, 14, 4.5] },
        { data: [15, 18, 5] },
        { data: [19, 22, 5.5] },
        { data: [23, 26, 6] },
        { data: [27, 29, 6.5] },
        { data: [30, 32, 7] },
        { data: [33, 34, 7.5] },
        { data: [35, 36, 8] },
        { data: [37, 38, 8.5] },
        { data: [39, 40, 9] },
      ],

      selectRange: [],
    },
  };
  formBuilder: FormGroup;
  Goal_avg: any;
  constructor(public fb: FormBuilder, public comm: CommonService) {
    this.formBuilder = this.fb.group({
      Goal_l: ['', [Validators.required]],
      Goal_r: ['', [Validators.required]],
      Goal_w: ['', [Validators.required]],
      Goal_s: ['', [Validators.required]],
      targateDate: [
        this.comm.goalSetting.targateDate
          ? new Date(this.comm.goalSetting.targateDate)
          : new Date(),
        [Validators.required],
      ],
    });

    this.formBuilder.valueChanges.subscribe((x) => {
      this.calGoal_avg();
    });

    this.calResult.listening.selectRange = this.selectRange(
      this.calResult.listening.score[0].data[0],
      this.calResult.listening.totalScore
    );
    this.calResult.readingGeneral.selectRange = this.selectRange(
      this.calResult.readingGeneral.score[0].data[0],
      this.calResult.readingGeneral.totalScore
    );
    this.calResult.readingAcademic.selectRange = this.selectRange(
      this.calResult.readingAcademic.score[0].data[0],
      this.calResult.readingAcademic.totalScore
    );
  }
  selectRange(min, max) {
    const array = [];
    for (let i = min; i <= max; i++) {
      array.push(i);
    }
    return array;
  }

  listening = ($event) => {
    this.calResult.listening.marks = $event.target.value;
    this.calResult.listening.result = this.getResult(
      this.calResult.listening.score,
      this.calResult.listening.marks
    );
  };
  readingGeneral = ($event) => {
    this.calResult.readingGeneral.marks = $event.target.value;
    this.calResult.readingGeneral.result = this.getResult(
      this.calResult.readingGeneral.score,
      this.calResult.readingGeneral.marks
    );
  };
  readingAcademic = ($event) => {
    this.calResult.readingAcademic.marks = $event.target.value;
    this.calResult.readingAcademic.result = this.getResult(
      this.calResult.readingAcademic.score,
      this.calResult.readingAcademic.marks
    );
  };

  getResult = (scoreList, marks) => {
    for (let i = 0; i < scoreList.length; i++) {
      const scoreData = scoreList[i].data;

      if (+marks >= scoreData[0] && +marks <= scoreData[1]) {
        return scoreData[2] + '';
      }
    }
    return '';
  };

  calGoal_avg() {
    if (
      this.formBuilder.value.Goal_l &&
      this.formBuilder.value.Goal_r &&
      this.formBuilder.value.Goal_w &&
      this.formBuilder.value.Goal_s
    ) {
      console.log(this.formBuilder.value);
      this.Goal_avg =
        (parseFloat(this.formBuilder.value.Goal_l) +
          parseFloat(this.formBuilder.value.Goal_r) +
          parseFloat(this.formBuilder.value.Goal_w) +
          parseFloat(this.formBuilder.value.Goal_s)) /
        4;
      if (this.Goal_avg.toString().indexOf('.') == -1) {
        console.log('-1', this.Goal_avg);
        return;
      }

      const calScore = this.Goal_avg.toString().split('.');
      if (parseFloat('0.' + calScore[1]) <= 0.25) {
        console.log(calScore[1] + '< 25');
        console.log(this.Goal_avg);
        this.Goal_avg = parseFloat(calScore[0]);
        return;
      }

      if (
        parseFloat('0.' + calScore[1]) > 0.25 &&
        parseFloat('0.' + calScore[1]) < 0.75
      ) {
        console.log(calScore[1] + '> 25 &&' + calScore[1] + '< 75');
        console.log(this.Goal_avg);
        this.Goal_avg = parseFloat(calScore[0] + '.5');
        return;
      }

      if (parseFloat('0.' + calScore[1]) >= 0.75) {
        console.log(calScore[1] + '>75');
        console.log(this.Goal_avg);
        this.Goal_avg = parseFloat(calScore[0]) + 1;
        return;
      }
    }
  }
}
