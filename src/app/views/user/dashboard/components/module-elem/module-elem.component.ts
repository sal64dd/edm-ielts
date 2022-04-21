import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalControllerService } from 'src/app/services/modal-controller.service';

@Component({
  selector: 'app-module-elem',
  templateUrl: './module-elem.component.html',
  styles: [
  ]
})
export class ModuleElemComponent implements OnInit {
  @Input() module: string = '';
  @Input() level: string = '';
  @Input() learnRoute: string[] = [''];

  constructor(private modal: ModalControllerService, private router: Router) { }

  ngOnInit(): void {
  }

  learn() {
    this.router.navigate(this.learnRoute)
  }

  test() {
    this.router.navigate(['/user/tests/'])
  }

}
