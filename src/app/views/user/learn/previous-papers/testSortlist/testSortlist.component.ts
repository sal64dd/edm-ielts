/* eslint-disable @typescript-eslint/prefer-for-of */
import { CommonapiService } from 'src/app/services/api/commonapi.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'testSortlist',
  templateUrl: 'testSortlist.component.html',
  styleUrls: ['testSortlist.component.scss'],
})
export class TestSortList {
  datas: any = [];
  timeout: any;
  skeleton: boolean = false;
  get_Notification_List_Mobile_subscription: any;
  error_msg_response = { msg: '', status: false, loading: false }; // store error response

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
      this.datas = this.datas.filter((data) =>
        this.comm.tmpPreviousPaper.id == data.id &&
        this.comm.tmpPreviousPaper.shortlisted == false
          ? false
          : true
      );
    }
    this.comm.tmpPreviousPaper = '';
  }

  loading() {
    this.getPreTest();
  }

  Get_previous_Ielts_tests_Subscribe: any;
  getPreTest() {
    this.error_msg_response.loading = true;
    if (this.Get_previous_Ielts_tests_Subscribe) {
      this.Get_previous_Ielts_tests_Subscribe.unsubscribe();
    }

    this.Get_previous_Ielts_tests_Subscribe = this.commApi
      .previous_test_shortlisted()
      .subscribe(
        (data) => {
          console.log('Get_previous_Ielts_tests');
          console.log(data);
          this.error_msg_response.status = false;
          this.error_msg_response.loading = false;
          switch (data.error_message.success) {
            case 1: {
              if (data.error_message.data.length) {
                this.skeleton = true;
                const tmpdatas = [...this.datas, ...data.error_message.data];
                for (let i = 0; i < tmpdatas.length; i++) {
                  this.datas.push({
                    id: tmpdatas[i].id,
                    content: tmpdatas[i].content,
                    created: tmpdatas[i].created,
                    programe_name: tmpdatas[i].programe_name,
                    shortlisted: true,
                  });
                }

                console.log(this.datas);
              }
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

  history() {
    this.navController.navigateForward(['previousPaper/historyPaperDetails']);
  }
}
