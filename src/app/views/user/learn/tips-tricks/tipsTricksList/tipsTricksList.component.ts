import { CommonapiService } from '../../services/api/commonapi.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'tipsTricksListComponent',
  templateUrl: 'tipsTricksList.component.html',
  styleUrls: ['tipsTricksList.component.scss'],
})
export class tipsTricksListComponent implements OnInit, OnDestroy{
  datas: any = [];

  skeleton: boolean = false;
  Get_tips_tricks_parentsubscription: any;
  error_msg_response = { msg: '', status: false, loading: false }; // store error response
  title: any;
  constructor(
    public route: ActivatedRoute,
    public cd: ChangeDetectorRef,
    public navController: NavController,
    public commApi: CommonapiService,
    public comm: CommonService
  ) {
    this.comm.analyticsData('Notifications', {});
    this.title = this.route.snapshot.params.title;
  }

  refreshApi() {
    this.error_msg_response = { msg: '', status: false, loading: false };

    this.skeleton = false;
    this.Get_tips_tricks_child();
  }

  ngOnInit() {
    this.refreshApi();
  }

  Get_tips_tricks_child() {
    this.error_msg_response.loading = true;

    this.Get_tips_tricks_parentsubscription = this.commApi
      .Get_tips_tricks_child(this.route.snapshot.params.id)
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
              console.log(this.datas);
              break;
            }

            case 0: {
              // 404 not found msg

              this.comm.Toast(data.error_message.message);
              break;
            }

            default: {
              this.comm.Toast(data.error_message.message);
              break;
            }
          }
          this.cd.detectChanges();
        },
        (err) => {
          console.log(err);
          this.error_msg_response = {
            msg: this.comm.commonError(err),
            status: true,
            loading: false,
          };
        }
      );
  }

  ngOnDestroy() {
    try {
      if (this.Get_tips_tricks_parentsubscription) {
        this.Get_tips_tricks_parentsubscription.unsubscribe();
      }
    } catch (err) {}
  }
}
