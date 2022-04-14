import { CommonapiService } from '../../services/api/commonapi.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'historyPaperDetails',
  templateUrl: 'historyPaperDetails.component.html',
  styleUrls: ['historyPaperDetails.component.scss'],
})
export class HistoryPaperDetails {
  datas: any = [];
  timeout: any;
  skeleton: boolean = false;
  get_Notification_List_Mobile_subscription: any;
  error_msg_response = { msg: '', status: false, loading: false }; // store error response

  limit: any = 25;
  offset: any = 0;
  loader: any = false;
  total_rows: any;
  constructor(
    public cd: ChangeDetectorRef,
    public navController: NavController,
    public commApi: CommonapiService,
    public comm: CommonService
  ) {
    this.comm.analyticsData('Notifications', {});
    this.refreshApi();
  }

  refreshApi() {
    this.error_msg_response = { msg: '', status: false, loading: false };
    this.datas = [];
    this.skeleton = false;
    this.getPreTest();
  }

  ionViewWillEnter() {
    if (this.comm.tmpPreviousPaper) {
      this.datas.map((data) =>
        this.comm.tmpPreviousPaper.id == data.id
          ? this.comm.tmpPreviousPaper
          : data
      );
    }
    this.comm.tmpPreviousPaper = '';
  }

  loading() {
    this.getPreTest();
  }

  btn: any = true;
  Get_previous_Ielts_tests_Subscribe: any;
  getPreTest() {
    this.error_msg_response.loading = true;
    if (this.Get_previous_Ielts_tests_Subscribe) {
      this.Get_previous_Ielts_tests_Subscribe.unsubscribe();
    }
    this.loader = true;
    this.Get_previous_Ielts_tests_Subscribe = this.commApi
      .read_history(this.limit, this.offset)
      .subscribe(
        (data) => {
          this.loader = false;
          console.log('Get_previous_Ielts_tests');
          console.log(data);
          this.error_msg_response.status = false;
          this.error_msg_response.loading = false;
          switch (data.error_message.success) {
            case 1: {
              if (data.error_message.data.length) {
                this.offset = this.offset + this.limit;
                this.skeleton = true;
                this.datas = [...this.datas, ...data.error_message.data];
                this.total_rows = data.error_message.total_rows;
                console.log(this.datas);
              } else {
                this.btn = false;
              }
              break;
            }
            case 0: {
              // 404 not found msg
              this.skeleton = true;

              this.btn = false;
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
          this.loader = false;
          this.error_msg_response = {
            msg: this.comm.commonError(err),
            status: true,
            loading: false,
          };
        }
      );
  }

  paperDetails(data) {
    console.log(data);
    this.comm.tmpPreviousPaper = data;
    // this.commApi.read_history_add(data.id).subscribe(data=>{
    //     console.log("read_history_add");
    //     console.log(data)
    // })
    this.navController
      .navigateForward(['previousPaper/showPaper'])
      .then((data) => {
        console.log('back');
      });
  }

}
