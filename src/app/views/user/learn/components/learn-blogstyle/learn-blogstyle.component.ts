import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn-blogstyle',
  templateUrl: './learn-blogstyle.component.html',
  styles: [
  ]
})
export class LearnBlogstyleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  modules = [
    {
      type: 'IELTS',
      module: 'Listening',
      descp: `Listening is the ability to accurately receive and interpret messages in the communication process. `,
      img: '/assets/imgs/modules/listening.png',
      route: ['/user/learn/wiki/1/46']
    },
    {
      type: 'IELTS',
      module: 'Reading',
      descp: `Reading is a means for language acquisition, communication, sharing information and ideas. It includes knowledge of vocabulary, grammar, as well as spelling.`,
      img: '/assets/imgs/modules/reading.png',
      route: ['/user/learn/wiki/1/44']
    },
    {
      type: 'IELTS',
      module: 'Writing',
      descp: `The writing component of the IELTS exam is designed to assess how you \"write a response appropriately, organise ideas and use a range of vocabulary and grammar accurately.\" `,
      img: '/assets/imgs/modules/writing.png',
      route: ['/user/learn/wiki/1/45']
    },
    {
      type: 'IELTS',
      module: 'Speaking',
      descp: `The Speaking module is one of the four skills tested in the IELTS exam. The IELTS Speaking is a face-to-face, informal discussion with an IELTS examiner, and is the same for both Academic and General Training.`,
      img: '/assets/imgs/modules/speaking.png',
      route: ['/user/learn/wiki/1/47']
    },
  ]

}
