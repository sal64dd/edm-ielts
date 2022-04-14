import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterContentInit,
  AfterViewInit,
} from '@angular/core';
import { ContinueService } from 'src/app/services/continue.service';
import { GoalsService } from 'src/app/services/goals.service';
import { PointsService } from 'src/app/services/points.service';
import { ReportService } from 'src/app/services/report.service';
import { TopElem } from 'src/app/types/common-components';

@Component({
  selector: 'app-dashboard-user-v2',
  templateUrl: './dashboard-user.component.html',
})
export class DashboardUserV2Component implements OnInit, AfterViewInit {
  TopElemList: TopElem[] = [
    {
      heading: 'Continue Reading',
      text: 'Tenses',
      icon: '',
    },
    {
      heading: 'Your Average Score',
      text: '7.5 Band',
      icon: '',
      sub: '+3%',
      subColor: 'success',
    },
    {
      heading: 'Points',
      text: '3,462',
      icon: '',
    },
    {
      heading: 'Goals',
      text: '19th April',
      icon: '',
      sub: '2 Days Left',
      subColor: 'danger',
    },
  ];

  CaroselList = [
    {
      img: 'assets/images/carosel/2.jpg',
      heading: 'IELTS Aptitute Assesment',
      text: 'Know your IELTS score instantly by taking our short assessment test and build your confidence.',
      cta: 'Try Now',
      route: ['ielts/apt-test'],
      icon: '',
    },
    {
      img: 'assets/images/carosel/1.jpg',
      heading: 'Highlights and Bookmarks',
      text: 'You can highlight and save any part of the text in the learning section by just tapping and holding on the text.',
      cta: 'Try Now',
      route: ['bookmarks'],
      icon: '',
    },
  ];

  constructor(
    private continueService: ContinueService,
    private goals: GoalsService,
    private report: ReportService,
    private point: PointsService
  ) {}

  @ViewChild('main') main: ElementRef;

  ngOnInit() {}

  ngAfterViewInit() {}
}
