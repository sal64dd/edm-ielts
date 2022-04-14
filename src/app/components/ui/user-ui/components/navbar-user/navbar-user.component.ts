
import { Component } from "@angular/core";
import { NavbarComponent } from "../../../common-ui/components/navbar/navbar.component";
import { CommonUiService } from "../../../common-ui/services/common-ui.service";

@Component({
  selector: "app-navbar-user",
  templateUrl: "./navbar-user.component.html",
})
export class NavbarUserComponent extends NavbarComponent {
  constructor(public override ui: CommonUiService) {super(ui);}
}
