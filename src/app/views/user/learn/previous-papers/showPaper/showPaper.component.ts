import { CommonapiService } from '../../services/api/commonapi.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'showPaper',
  templateUrl: 'showPaper.component.html',
  styleUrls: ['showPaper.component.scss'],
})
export class ShowPaperComponent {
  data: any;
  shortlisted: any = '#ed3237';
  constructor(
    public comm: CommonService,
    public navController: NavController,
    public commApi: CommonapiService
  ) {
    this.data = comm.tmpPreviousPaper;

    console.log(this.data);
    this.shortlisted = this.data.shortlisted ? '#ed3237' : 'gray';
  }

  shortlistedList() {
    this.commApi.Get_previous_Ielts_tests_post(this.data.id).subscribe(
      (data) => {
        console.log(data);
        switch (data.error_message.success) {
          case 1: {
            this.shortlisted = data.error_message.shortlist
              ? '#ed3237'
              : 'gray';
            this.data.shortlisted = data.error_message.shortlist;
            this.comm.tmpPreviousPaper = this.data;
            this.comm.Toast(data.error_message.message);
            break;
          }
          case 0: {
            this.comm.Toast(data.error_message.message);
            break;
          }
          default: {
            this.comm.Toast(data.error_message.message);
            break;
          }
        }
      },
      (err) => {}
    );
  }
}
