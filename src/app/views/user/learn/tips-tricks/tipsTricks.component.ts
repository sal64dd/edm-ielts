import { CommonapiService } from '../services/api/commonapi.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from '../../../services/core/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'tipsTricks',
  templateUrl: 'tipsTricks.component.html',
  styleUrls: ['tipsTricks.component.scss'],
})
export class tipsTricksComponent implements OnInit, OnDestroy {
  datas: any = [];
  skeleton: boolean = false;
  Get_tips_tricks_parentsubscription: any;
  error_msg_response = { msg: '', status: false, loading: false }; // store error response

  constructor(
    public cd: ChangeDetectorRef,
    public router: Router
  ) {
  }

  refreshApi() {
    this.error_msg_response = { msg: '', status: false, loading: false };
    this.skeleton = false;
    this.Get_tips_tricks_parent();
  }

  ngOnInit() {
    this.refreshApi();
  }

  Get_tips_tricks_parent() {
    this.error_msg_response.loading = true;

    this.Get_tips_tricks_parentsubscription = this.commApi
      .Get_tips_tricks_parent()
      .subscribe(
        (data) => {
          this.skeleton = true;
          console.log(data);

          this.error_msg_response.status = false;
          this.error_msg_response.loading = false;

          switch (data.error_message.success) {
            case 1: {
              console.log(data);
              this.datas = data.error_message.data;

              break;
            }

            case 0: {
              // 404 not found msg
              break;
            }

            default: {
              break;
            }
          }
          this.cd.detectChanges();
        },
        (err: any) => {
          console.log(err);
          this.error_msg_response = {
            msg: '',
            status: true,
            loading: false,
          };
        }
      );
  }
  tipsTricksList(data: any) {
    this.router.navigate([
      '/tipsTricks/tipsTricksListComponent',
      { id: data.id, title: data.parent_subject },
    ]);
  }
  ngOnDestroy() {
    try {
      if (this.Get_tips_tricks_parentsubscription) {
        this.Get_tips_tricks_parentsubscription.unsubscribe();
      }
    } catch (err) {}
  }
}
