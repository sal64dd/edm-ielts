import { Component, OnInit } from "@angular/core";
import { FooterComponent } from "../../../common-ui/components/footer/footer.component";

@Component({
  selector: "app-footer-user",
  template: "<app-footer></app-footer>",
})
export class FooterUserComponent extends FooterComponent {
  constructor() {super()}
}
