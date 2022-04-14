import { Component,  } from "@angular/core";
import { SidebarComponent } from '../../../common-ui/components/sidebar/sidebar.component';
import { CommonUiService } from '../../../common-ui/services/common-ui.service';

@Component({
  selector: "app-sidebar-user",
  template: "<app-sidebar [nav]='nav'></app-sidebar>"
})
export class SidebarUserComponent extends SidebarComponent {
  override nav = [
    {
      text: 'Study',
      routerLink: ['/user/study'],
      icon: 'shop',
      children: [
        {
          text: 'Study Goals',
          routerLink: ['/user/dashboard/goals'],
        },
        {
          text: 'Task List',
          routerLink: ['/user/dashboard/tasks'],
        },
        {
          text: 'IELTS Band Calculator',
          routerLink: ['/user/dashboard/score-calculator'],
        },
        {
          text: 'Social Events',
          routerLink: ['/user/dashboard/events'],
        },
      ]
    },
    {
      text: 'Learn',
      routerLink: ['/user/learn'],
      icon: 'document',
      children: [
        {
          text: 'English Essentials',
          routerLink: [''],
        },
        {
          text: 'IELTS',
          routerLink: [''],
        },
        {
          text: 'Dictionary',
          routerLink: [''],
        },
        {
          text: 'Tips and Tricks',
          routerLink: [''],
        },
        {
          text: 'Bookmarks',
          routerLink: [''],
        },
      ]
    },
    {
      text: 'Test',
      routerLink: ['/user/tests'],
      icon: 'document',
      children: [
        {
          text: 'Practice Test',
          routerLink: ['']
        },
        {
          text: 'Mock Test',
          routerLink: ['']
        },
        {
          text: 'Archived Test Questions',
          routerLink: ['']
        },
        {
          text: 'Performance Report',
          routerLink: ['']
        }
      ]
    },
    {
      text: 'Courses',
      routerLink: ['/user/courses'],
      icon: 'shop',
      children: [
        {
          text: 'Search Courses',
          routerLink: ['']
        },
        {
          text: 'Course Library',
          routerLink: ['']
        },
        {
          text: 'Assignments',
          routerLink: ['']
        },
      ]
    },
    {
      text: 'Packages',
      routerLink: ['/user/packages'],
      children: [
        {
          text: 'Current Package',
          routerLink: ['']
        },
        {
          text: 'Package History',
          routerLink: ['']
        },
      ]
    },
    {
      text: 'Live Counselling',
      routerLink: ['/user/counselling'],
      icon: 'shop',
    },

  ];
  constructor(public override ui: CommonUiService) {
    super(ui);
  }

}
