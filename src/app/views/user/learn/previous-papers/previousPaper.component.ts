import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
  selector: 'previousPaper',
  templateUrl: 'previousPaper.component.html',
  styleUrls: ['previousPaper.component.scss'],
})
export class PreviousPaperComponent implements OnInit {
  datas: any = [];
  timeout: any;
  skeleton: boolean = false;
  get_Notification_List_Mobile_subscription: any;
  error_msg_response = { msg: '', status: false, loading: false }; // store error response

  limit: any = 25;
  offset: any = 0;
  loader: any = false;
  total_rows: any;

  btn: any = true;
  Get_previous_Ielts_tests_Subscribe: any;

  constructor(public cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.datas = [];
    this.limit = 25;
    this.offset = 0;
    this.btn = true;
    this.getPreTest();
  }

  getPreTest() {
    this.loader = true;

    this.Get_previous_Ielts_tests_Subscribe = this.commApi
      .Get_previous_Ielts_tests(this.limit, this.offset)
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
    this.commApi.read_history_add(data.id).subscribe((data) => {
      console.log('read_history_add');
      console.log(data);
    });
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
