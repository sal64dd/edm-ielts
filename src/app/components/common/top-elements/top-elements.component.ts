import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { TopElem } from 'src/app/types/common-components';
import { GoalsModalComponent } from 'src/app/views/user/components/goals-modal/goals-modal.component';

@Component({
  selector: 'app-top-elements',
  templateUrl: './top-elements.component.html',
  styles: [],
})
export class TopElementsComponent implements OnInit {
  TopElemList: TopElem[] = [
    {
      heading: 'Continue Reading',
      text: 'Tenses',
      icon: 'ri-arrow-right-line',
      click: () => {
        this.router.navigate(['/user/learn/wiki/0/82/734'])
        this.modal.destroy();
      }
    },
    {
      heading: 'Your Average Score',
      text: '7.5 Band',
      icon: 'ri-account-circle-line',
      sub: '+3%',
      subColor: 'success',
    },
    {
      heading: 'Points',
      text: '3,462',
      icon: 'ri-coin-line',
    },
    {
      heading: 'Goals',
      text: '22nd April',
      icon: 'ri-calendar-2-fill',
      sub: '2 Days Left',
      subColor: 'danger',
      click: () => {
        const modalref = this.modal.createModal({modal: GoalsModalComponent, params: {}});
        modalref.subscribe((res: any) => {
          console.log('modal ended')
          this.modal.destroy();
        })
      }
    },
  ];

  constructor(private modal: ModalControllerService, private router: Router) {}

  ngOnInit(): void {}
}
