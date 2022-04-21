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
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { PointsService } from 'src/app/services/points.service';
import { ReportService } from 'src/app/services/report.service';
import { TopElem } from 'src/app/types/common-components';
import { GoalsModalComponent } from '../components/goals-modal/goals-modal.component';

@Component({
  selector: 'app-dashboard-user-v2',
  templateUrl: './dashboard-user.component.html',
})
export class DashboardUserV2Component implements OnInit, AfterViewInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);


  CaroselList = [
    {
      img: '/assets/imgs/carosel/1.jpg',
      heading: 'IELTS Aptitute Assesment',
      text: 'Know your IELTS score instantly by taking our short assessment test and build your confidence.',
      cta: 'Try Now',
      route: ['ielts/apt-test'],
      icon: '',
    },
    {
      img: '/assets/imgs/carosel/1.jpg',
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
    private point: PointsService,
    private modal: ModalControllerService
  ) {}

  @ViewChild('main') main: ElementRef;

  ngOnInit() {}

  ngAfterViewInit() {}
}
