import { Component, OnInit } from '@angular/core';
import { TopElem } from 'src/app/types/common-components';

@Component({
  selector: 'app-user-learn',
  templateUrl: `./learn.component.html`
})

export class LearnComponent implements OnInit {

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

  modules = [
    {
      type: 'English',
      module: 'English Essentials',
      img: '/assets/imgs/modules/practice_tes_widet.png',
      route: ['/user/learn/wiki/0']
    },
    {
      type: 'IELTS',
      module: 'Listening',
      img: '/assets/imgs/modules/listening.png',
      route: ['/user/learn/wiki/1/46']
    },
    {
      type: 'IELTS',
      module: 'Reading',
      img: '/assets/imgs/modules/reading.png',
      route: ['/user/learn/wiki/1/44']
    },
    {
      type: 'IELTS',
      module: 'Writing',
      img: '/assets/imgs/modules/writing.png',
      route: ['/user/learn/wiki/1/45']
    },
    {
      type: 'IELTS',
      module: 'Speaking',
      img: '/assets/imgs/modules/speaking.png',
      route: ['/user/learn/wiki/1/47']
    },

  ]


  constructor() { }

  ngOnInit() { }
}
