import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { iSidebarListv1 } from "../sidebar-user/sidebar-user.component";

@Component({
  selector: "app-sidebar-admin",
  templateUrl: "./sidebar-admin.component.html",
})
export class SidebarAdminComponent implements OnInit {
  userSidebar: iSidebarListv1[] = [
    {
      text: 'Dashboard',
      path: ['/admin/dashboard'],
      icon: 'shop',
    },
    {
      text: 'Counselling',
      path: ['/admin/counselling'],
      icon: 'shop',
    },

  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
